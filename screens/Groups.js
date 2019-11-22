// @flow

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  AsyncStorage,
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import { BlurView } from 'expo-blur';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import { getOpenGroups, getCategories } from '../data/groups';
import Text from '../components/Text';
import Button from '../components/Button';
import GroupCardPlaceholder from '../components/GroupCardPlaceholder';
import GroupCardDetails from '../components/GroupCardDetails';
import SearchBar from '../components/SearchBar';
import GroupFilterModal from '../components/GroupFilterModal';
import Error from '../components/GroupsError';
import Spinner from '../components/Spinner';

const storeGroupsData = async groups => {
  await AsyncStorage.setItem('@groups', JSON.stringify(groups)).catch(err =>
    console.error(err)
  );
};

function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

function useQuery(groups) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const queriedGroups = [
    ...groups,
  ].filter(({ groupname = '' }: { groupname?: string }) =>
    groupname.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return [query, setQuery, queriedGroups];
}

const Card = ({ navigation, item }) => {
  return (
    <View>
      {item.uuid.includes('loading') ? (
        <GroupCardPlaceholder />
      ) : (
        <GroupCardDetails navigation={navigation} item={item} />
      )}
    </View>
  );
};

const initialFilters = {
  Campus: [],
  Day: [],
  Categories: [],
};

const GroupsScreen = ({ navigation }: { navigation: Object }) => {
  const [groups, setGroups] = useState([
    { uuid: 'loading1' },
    { uuid: 'loading2' },
    { uuid: 'loading3' },
    { uuid: 'loading4' },
    { uuid: 'loading5' },
    { uuid: 'loading6' },
    { uuid: 'loading7' },
    { uuid: 'loading8' },
  ]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery, queriedGroups] = useQuery(groups);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [refreshing, setRefreshing] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [tryAgain, setTryAgain] = useState(false);

  useEffect(() => {
    const getGroups = async () => {
      try {
        const storedGroupsData = await AsyncStorage.getItem(
          '@groups'
        ).catch(err => console.error(err));

        if (storedGroupsData) {
          setGroups(JSON.parse(storedGroupsData));
        }

        const fetchedGroups = (await getOpenGroups()) || [];

        setGroups(fetchedGroups);
        storeGroupsData(fetchedGroups);
      } catch (err) {
        console.error('Error getting open groups', err);
        setHasError(true);
      }

      setRefreshing(false);
      setTryAgain(false);
    };
    const getGroupCategories = async () => {
      const fetchedCategories =
        (await getCategories().catch(err =>
          console.error('Error getting categories', err)
        )) || [];

      setCategories(fetchedCategories);
    };

    if (refreshing || tryAgain) {
      Promise.all([getGroups(), getGroupCategories()]);
      return;
    }

    Promise.all([getGroups(), getGroupCategories()]);
  }, [setGroups, setCategories, refreshing, tryAgain]);

  const filterGroups = ({
    campus = '',
    daysOfWeek = [],
    categories: { CustomeCategories = [] } = {},
  }: {
    campus?: string,
    daysOfWeek?: Array<string>,
    dayOfMonth?: string,
    categories?: { CustomeCategories: Array<string> },
  } = {}) => {
    const { Campus = [], Day = [], Categories = [] } = filters;

    if (!Campus.length && !Day.length && !Categories.length) {
      return true;
    }

    return (
      (Campus.length
        ? Campus.map(c => c.toLowerCase()).includes(campus.toLowerCase())
        : true) &&
      (Day.length
        ? Day.some(day =>
            daysOfWeek.map(dow => dow.toLowerCase()).includes(day.toLowerCase())
          )
        : true) &&
      (Categories.length
        ? Categories.some(category =>
            CustomeCategories.map(cat => cat.toLowerCase()).includes(
              category.toLowerCase()
            )
          )
        : true)
    );
  };

  const data = query ? queriedGroups : groups.filter(filterGroups);

  const showFilterModal = () => setIsFilterModalVisible(true);

  const renderNoResults = () => {
    if (query) {
      return (
        <View style={styles.noResults}>
          <Text bold style={styles.noResultsHeader}>
            No results
          </Text>
          <Text style={styles.noResultsText}>
            Try clearing your search or searching for something like
            &quot;Alpha&quot;
          </Text>
          <Button
            title="Clear Search"
            style={styles.button}
            onPress={() => {
              setQuery('');
            }}
          />
          <Button
            title="Try Alpha"
            style={styles.button}
            onPress={() => {
              setQuery('Alpha');
            }}
          />
        </View>
      );
    }

    return (
      <View style={styles.noResults}>
        <Text bold style={styles.noResultsHeader}>
          No results
        </Text>
        <Text style={[styles.noResultsText, styles.noResults]}>
          Try removing some of the filters that you&apos;ve applied
        </Text>
        <Button
          title="Change Filters"
          style={styles.button}
          onPress={showFilterModal}
        />
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../assets/images/groups_bg.png')}
        style={styles.backgroundImage}
      />

      {tryAgain && <Spinner />}

      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={Colors.gray}
            colors={[Colors.gray]}
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
        style={{ flex: 1 }}
        {...getHeaderInset()}
      >
        <Text bold style={styles.headerTitle}>
          GROUPS
        </Text>

        {hasError ? (
          <Error tryAgain={() => setTryAgain(true)} />
        ) : (
          <>
            <View style={styles.searchBar}>
              <SearchBar
                value={query}
                onChangeText={value => setQuery(value)}
              />
              <TouchableOpacity onPress={showFilterModal}>
                <Text style={styles.filter}>Filter</Text>
              </TouchableOpacity>
            </View>

            {data.length ? (
              <FlatList
                keyExtractor={({ uuid }) => uuid}
                data={data}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.cardShadow}>
                      <BlurView tint="dark" intensity={100} style={styles.card}>
                        <Card navigation={navigation} item={item} />
                      </BlurView>
                    </View>
                  );
                }}
                style={styles.list}
              />
            ) : (
              renderNoResults()
            )}
          </>
        )}
      </ScrollView>

      <GroupFilterModal
        categories={categories}
        isVisible={isFilterModalVisible}
        setIsVisible={setIsFilterModalVisible}
        appliedFilters={filters}
        applyFilters={setFilters}
      />
    </View>
  );
};

GroupsScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  searchBar: {
    paddingHorizontal: 10,
    marginVertical: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 30,
    color: Colors.red,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  filter: {
    padding: 10,
    fontSize: 22,
    color: Colors.gray,
  },
  list: {
    paddingHorizontal: 10,
  },
  separator: { height: 20 },
  card: {
    borderRadius: 16,
  },
  cardShadow: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
  },
  noResults: { paddingHorizontal: 20 },
  noResultsHeader: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.gray,
  },
  noResultsText: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.gray,
  },
  button: { marginTop: 20 },
});

export default GroupsScreen;
