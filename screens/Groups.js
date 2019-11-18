// @flow

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { BlurView } from 'expo-blur';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import { getOpenGroups, getCategories } from '../data/groups';
import Text from '../components/Text';
import GroupCardPlaceholder from '../components/GroupCardPlaceholder';
import GroupCardDetails from '../components/GroupCardDetails';
import SearchBar from '../components/SearchBar';
import GroupFilterModal from '../components/GroupFilterModal';

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
  const queriedGroups = [...groups].filter(
    ({ groupname = '' }: { groupname?: string }) =>
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
  const [filters, setFilters] = useState({
    Campus: [],
    Day: [],
    Categories: [],
  });

  useEffect(() => {
    const getGroups = async () => {
      try {
        const fetchedGroups = (await getOpenGroups()) || [];

        setGroups(fetchedGroups);
      } catch (err) {
        console.error('Error getting open groups', err);
        setGroups([]);
        // setHasError(true);
      }
    };
    const getGroupCategories = async () => {
      const fetchedCategories =
        (await getCategories().catch(err =>
          console.error('Error getting categories', err)
        )) || [];

      setCategories(fetchedCategories);
    };

    Promise.all([getGroups(), getGroupCategories()]);
  }, [setGroups, setCategories]);

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

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../assets/images/groups_bg.png')}
        style={styles.backgroundImage}
      />

      <ScrollView style={{ flex: 1 }} {...getHeaderInset()}>
        <Text bold style={styles.headerTitle}>
          GROUPS
        </Text>
        <FlatList
          keyExtractor={({ uuid }) => uuid}
          data={
            query
              ? [{ uuid: 'searchbar' }, ...queriedGroups]
              : [{ uuid: 'searchbar' }, ...groups.filter(filterGroups)]
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ index, item }) => {
            if (index === 0) {
              return (
                <View style={styles.container}>
                  <SearchBar
                    value={query}
                    onChangeText={value => setQuery(value)}
                  />
                  <TouchableOpacity
                    onPress={() => setIsFilterModalVisible(true)}
                  >
                    <Text
                      style={{ padding: 10, fontSize: 22, color: Colors.gray }}
                    >
                      Filter
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }
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
  container: {
    marginTop: 20,
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
});

export default GroupsScreen;
