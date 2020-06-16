import React, { useState, useEffect } from 'react';
import {
  AsyncStorage,
  FlatList,
  ImageBackground,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useScrollToTop } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import * as Amplitude from 'expo-analytics-amplitude';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import useHandleTabChange from '../utils/useHandleTabChange';
import { getOpenGroups, getCategories } from '../data/groups';
import { Text, Subtitle } from '../components/shared/Typography';
import Button from '../components/shared/Button';
import GroupCardPlaceholder from '../components/GroupCardPlaceholder';
import GroupCardDetails from '../components/GroupCardDetails';
import SearchBar from '../components/SearchBar';
import GroupFilterModal from '../components/GroupFilterModal';
import Error from '../components/GroupsError';
import Spinner from '../components/shared/Spinner';

const storeGroupsData = async (groups) => {
  await AsyncStorage.setItem('@groups', JSON.stringify(groups)).catch((err) =>
    console.error(err)
  );
};
const getStoredGroupsData = () => {
  return AsyncStorage.getItem('@groups').catch((err) => console.error(err));
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
  const queriedGroups = [...groups].filter(({ name = '' }) =>
    name?.toLowerCase().includes(debouncedQuery?.toLowerCase())
  );

  useEffect(() => {
    if (debouncedQuery) {
      Amplitude.logEventWithProperties('SEARCH Groups', {
        search_text: debouncedQuery,
      });
    }
  }, [debouncedQuery]);

  return [query, setQuery, queriedGroups];
}

const Card = ({ item }) => {
  return (
    <View style={styles.cardShadow}>
      <BlurView tint="dark" intensity={100} style={styles.card}>
        {item?.uuid?.toString().includes('loading') ? (
          <GroupCardPlaceholder />
        ) : (
          <GroupCardDetails item={item} />
        )}
      </BlurView>
    </View>
  );
};

const initialFilters = {
  Campus: [],
  Day: [],
  Categories: [],
};

const GroupsScreen = () => {
  useHandleTabChange('Groups');
  const insets = useSafeArea();
  const ref = React.useRef(null);

  useScrollToTop(ref);

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
  const numberOfFiltersApplied =
    filters.Campus.length + filters.Categories.length + filters.Day.length;

  useEffect(() => {
    const getGroups = async () => {
      try {
        const storedGroupsData = await getStoredGroupsData();

        if (storedGroupsData) {
          setGroups(JSON.parse(storedGroupsData));
        }

        const fetchedGroups = (await getOpenGroups()) || [];

        setGroups(fetchedGroups);
        storeGroupsData(fetchedGroups);
      } catch (err) {
        setHasError(true);
      }

      setRefreshing(false);
      setTryAgain(false);
    };
    const getGroupCategories = async () => {
      const fetchedCategories = (await getCategories()) || [];

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
    categories: groupCategories = [],
  } = {}) => {
    const {
      Campus: campusFilter = [],
      Day: dayFilter = [],
      Categories: categoriesFilter = [],
    } = filters;

    if (!campusFilter.length && !dayFilter.length && !categoriesFilter.length) {
      return true;
    }

    return (
      (campusFilter.length
        ? campusFilter
            .map((c) => c?.toLowerCase())
            .includes(campus?.toLowerCase())
        : true) &&
      (dayFilter.length
        ? dayFilter.some((day) =>
            daysOfWeek
              .map((dow) => dow?.toLowerCase())
              .includes(day?.toLowerCase())
          )
        : true) &&
      (categoriesFilter.length
        ? categoriesFilter.some((category) => {
            if (category === 'Co-Ed / General') {
              category = 'co-ed';
            }
            return groupCategories
              .map((cat) => cat?.toLowerCase())
              .includes(category?.toLowerCase());
          })
        : true)
    );
  };

  const data = query ? queriedGroups : groups.filter(filterGroups);

  const showFilterModal = () => setIsFilterModalVisible(true);

  const renderNoResults = () => {
    if (query) {
      return (
        <View style={styles.noResults}>
          <Subtitle center style={styles.noResultsHeader}>
            No results
          </Subtitle>
          <Text>
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
        <Subtitle style={styles.noResultsHeader}>No results</Subtitle>
        <Text style={styles.noResults}>
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
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <ImageBackground
        source={require('../assets/images/groups_bg.png')}
        style={styles.backgroundImage}
      />

      {tryAgain && <Spinner />}

      <Text XXL bold style={styles.headerTitle}>
        GROUPS
      </Text>

      {hasError ? (
        <Error tryAgain={() => setTryAgain(true)} />
      ) : (
        <>
          <View style={[styles.searchBar, { flex: data.length ? 1 : 0 }]}>
            <SearchBar
              value={query}
              onChangeText={(value) => setQuery(value)}
            />
            <TouchableOpacity style={styles.filter} onPress={showFilterModal}>
              <Text L adjustsFontSizeToFit allowFontScaling={false}>
                Filter
              </Text>
              {numberOfFiltersApplied > 0 && (
                <View style={styles.badge}>
                  <Text S center light style={styles.badgeCount}>
                    {numberOfFiltersApplied}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {data.length ? (
            <FlatList
              ref={ref}
              keyExtractor={({ uuid }) => uuid.toString()}
              data={data}
              renderItem={({ item }) => {
                return <Card item={item} />;
              }}
              refreshControl={
                <RefreshControl
                  tintColor={Colors.gray}
                  colors={[Colors.gray]}
                  refreshing={refreshing}
                  onRefresh={() => setRefreshing(true)}
                />
              }
              style={styles.list}
            />
          ) : (
            renderNoResults()
          )}
        </>
      )}

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

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  searchBar: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  headerTitle: {
    marginVertical: 10,
    marginLeft: 16,
    color: Colors.red,
  },
  backgroundImage: {
    width: '100%',
    height: Layout.window.height,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  filter: {
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.blue,
    borderRadius: 10,
  },
  badgeCount: { paddingTop: 1 },
  list: {
    height: '100%',
    paddingHorizontal: 10,
    marginTop: 40,
  },
  card: {
    marginBottom: 16,
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
  noResultsHeader: { marginTop: 10 },
  button: { marginTop: 20 },
});

export default GroupsScreen;
