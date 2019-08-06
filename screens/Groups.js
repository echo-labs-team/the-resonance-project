// @flow

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
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

const Card = ({ navigation, index, numberOfGroups, item }) => {
  const isLastCard = index === numberOfGroups;
  const lastCardStyles = { marginBottom: 60 };

  return (
    <View style={[styles.card, isLastCard && lastCardStyles]}>
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
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    console.log('applied filters', filters);
  }, [filters]);

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

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../assets/images/groups_bg.png')}
        style={styles.backgroundImage}
      />

      <FlatList
        keyExtractor={({ uuid }) => uuid}
        data={
          query
            ? [{ uuid: 'searchbar' }, ...queriedGroups]
            : [{ uuid: 'searchbar' }, ...groups]
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
                <TouchableOpacity onPress={() => setIsFilterModalVisible(true)}>
                  <Text
                    bold
                    style={{ padding: 10, fontSize: 22, color: Colors.blue }}
                  >
                    Filter
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }
          return (
            <Card
              navigation={navigation}
              index={index}
              numberOfGroups={groups.length - 1}
              item={item}
            />
          );
        }}
        style={styles.list}
        {...getHeaderInset()}
      />

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
  title: 'GROUPS',
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
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: Colors.darkerGray,
  },
});

export default GroupsScreen;
