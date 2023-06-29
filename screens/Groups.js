import React, { useState, useEffect } from 'react';
import {
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
import logEvent from '../utils/logEvent';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { useHandleTabChange } from '../utils/useHandleTabChange';
import { getOpenGroups } from '../queries/groups';
import { Text, Subtitle } from '../components/shared/Typography';
import Button from '../components/shared/Button';
import GroupCardPlaceholder from '../components/GroupCardPlaceholder';
import GroupCardDetails from '../components/GroupCardDetails';
import SearchBar from '../components/SearchBar';
import GroupFilterModal from '../components/GroupFilterModal';
import Error from '../components/GroupsError';
import Spinner from '../components/shared/Spinner';

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

function useSearchQuery(groups) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const queriedGroups = [...groups].filter(({ Name = '' }) =>
    Name?.toLowerCase().includes(debouncedQuery?.toLowerCase())
  );

  useEffect(() => {
    if (debouncedQuery) {
      logEvent('SEARCH Groups', {
        search_text: debouncedQuery,
      });
    }
  }, [debouncedQuery]);

  return [query, setQuery, queriedGroups];
}

function Card({ item }) {
  return (
    <View style={styles.cardShadow}>
      <BlurView intensity={100} style={styles.card} tint="dark">
        {item?.Id?.toString().includes('loading') ? (
          <GroupCardPlaceholder />
        ) : (
          <GroupCardDetails item={item} />
        )}
      </BlurView>
    </View>
  );
}

const initialFilters = {
  Campus: [],
  Categories: [],
  Day: [],
};

function GroupsScreen() {
  useHandleTabChange('Groups');
  const insets = useSafeArea();
  const ref = React.useRef(null);

  useScrollToTop(ref);

  const [groups, setGroups] = useState([
    { Id: 'loading1' },
    { Id: 'loading2' },
    { Id: 'loading3' },
    { Id: 'loading4' },
    { Id: 'loading5' },
    { Id: 'loading6' },
    { Id: 'loading7' },
    { Id: 'loading8' },
  ]);
  const [query, setQuery, queriedGroups] = useSearchQuery(groups);
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
        const fetchedGroups = (await getOpenGroups()) || [];

        setGroups(fetchedGroups);
      } catch (err) {
        setHasError(true);
      }

      setRefreshing(false);
      setTryAgain(false);
    };

    if (refreshing || tryAgain) {
      getGroups();
      return;
    }

    getGroups();
  }, [setGroups, refreshing, tryAgain]);

  const filterGroups = ({
    AudienceName = '',
    DayOfWeek = '',
    GroupCampus = '',
    TopicName = '',
  } = {}) => {
    const {
      Campus: campusFilter = [],
      Categories: categoriesFilter = [],
      Day: dayFilter = [],
    } = filters;

    if (!campusFilter.length && !dayFilter.length && !categoriesFilter.length) {
      return true;
    }

    return (
      (campusFilter.length
        ? campusFilter
            .map((c) => c?.toLowerCase())
            .includes(GroupCampus?.toLowerCase())
        : true) &&
      (dayFilter.length
        ? dayFilter.some(
            (day) => DayOfWeek.toLowerCase() === day?.toLowerCase()
          )
        : true) &&
      (categoriesFilter.length
        ? categoriesFilter.some((category = '') => {
            if (!category) {
              return false;
            }

            // get each category of a filter that includes multiple audience or topic names
            const categoryNames = category?.split('/') || [];

            // check if some of the category filters apply to the group's audience or topic
            return categoryNames.some((categoryName) => {
              return (
                AudienceName.toLowerCase().includes(
                  categoryName.toLowerCase()
                ) ||
                TopicName.toLowerCase().includes(categoryName.toLowerCase())
              );
            });
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
            onPress={() => {
              setQuery('');
            }}
            style={styles.button}
            title="Clear Search"
          />
          <Button
            onPress={() => {
              setQuery('Alpha');
            }}
            style={styles.button}
            title="Try Alpha"
          />
        </View>
      );
    }

    if (numberOfFiltersApplied > 0) {
      return (
        <View style={styles.noResults}>
          <Subtitle style={styles.noResultsHeader}>No results</Subtitle>
          <Text style={styles.noResults}>
            Try removing some of the filters that you&apos;ve applied
          </Text>
          <Button
            onPress={showFilterModal}
            style={styles.button}
            title="Change Filters"
          />
        </View>
      );
    }

    return (
      <View style={styles.noResults}>
        <Subtitle style={styles.noResultsHeader}>No results</Subtitle>
        <Text style={styles.noResults}>Try again later ⏱</Text>
      </View>
    );
  };

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <ImageBackground
        source={require('../assets/images/groups_bg.png')}
        style={styles.backgroundImage}
      />

      {tryAgain ? <Spinner /> : null}

      <Text XXL bold style={styles.headerTitle}>
        GROUPS
      </Text>

      {hasError ? (
        <Error tryAgain={() => setTryAgain(true)} />
      ) : (
        <>
          <View style={[styles.searchBar, { flex: data.length ? 1 : 0 }]}>
            <SearchBar
              onChangeText={(value) => setQuery(value)}
              value={query}
            />
            <TouchableOpacity onPress={showFilterModal} style={styles.filter}>
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
              contentContainerStyle={styles.contentContainer}
              data={data}
              keyExtractor={({ Id }) => Id.toString()}
              ref={ref}
              refreshControl={
                <RefreshControl
                  colors={[Colors.gray]}
                  onRefresh={() => setRefreshing(true)}
                  refreshing={refreshing}
                  tintColor={Colors.gray}
                />
              }
              renderItem={({ item }) => <Card item={item} />}
              style={styles.list}
            />
          ) : (
            renderNoResults()
          )}
        </>
      )}

      <GroupFilterModal
        appliedFilters={filters}
        applyFilters={setFilters}
        isVisible={isFilterModalVisible}
        setIsVisible={setIsFilterModalVisible}
      />
    </View>
  );
}

export const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: Layout.window.height,
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  badge: {
    height: 20,
    backgroundColor: Colors.blue,
    position: 'absolute',
    borderRadius: 10,
    right: 0,
    top: 0,
    width: 20,
  },
  badgeCount: { paddingTop: 1 },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  button: { marginTop: 20 },
  cardShadow: {
    shadowColor: Colors.black,
    elevation: 8,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  contentContainer: {
    paddingTop: 16,
  },
  headerTitle: {
    marginLeft: 16,
    marginVertical: 10,
    color: Colors.red,
  },
  filter: {
    height: 40,
    alignItems: 'center',
    width: 80,
    justifyContent: 'center',
  },
  mainContainer: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  list: {
    height: '100%',
    marginTop: 40,
    paddingHorizontal: 10,
  },
  searchBar: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  noResults: { paddingHorizontal: 20 },
  noResultsHeader: { marginTop: 10 },
});

export default GroupsScreen;
