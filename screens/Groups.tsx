import { useScrollToTop } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GroupCardDetails from '../components/GroupCardDetails';
import { GroupCardPlaceholder } from '../components/GroupCardPlaceholder';
import { GroupFilterModal } from '../components/GroupFilterModal';
import { SearchBar } from '../components/SearchBar';
import Button from '../components/shared/Button';
import { Subtitle, Text } from '../components/shared/Typography';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Group, useGroups } from '../queries/groups';
import { useHandleTabChange } from '../utils/useHandleTabChange';

const loadingData = [
  { Id: 'loading1' },
  { Id: 'loading2' },
  { Id: 'loading3' },
  { Id: 'loading4' },
  { Id: 'loading5' },
  { Id: 'loading6' },
  { Id: 'loading7' },
  { Id: 'loading8' },
];

function Card({ item }: { item: Group }) {
  return (
    <View style={styles.cardShadow}>
      <BlurView intensity={100} style={styles.card} tint="dark">
        <GroupCardDetails item={item} />
      </BlurView>
    </View>
  );
}

function NoResults({
  numberOfFiltersApplied,
  searchString,
  setSearchString,
  showFilterModal,
}: {
  numberOfFiltersApplied: number;
  searchString: string;
  setSearchString: (value: string) => void;
  showFilterModal: () => void;
}) {
  if (searchString) {
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
            setSearchString('');
          }}
          style={styles.button}
          title="Clear Search"
        />
        <Button
          onPress={() => {
            setSearchString('Alpha');
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
}

function GroupsScreen() {
  useHandleTabChange('Groups');
  const ref = useRef(null);
  useScrollToTop(ref);
  const insets = useSafeAreaInsets();
  const {
    filters,
    groups,
    isLoading,
    numberOfFiltersApplied,
    searchString,
    setFilters,
    setSearchString,
  } = useGroups();
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const showFilterModal = useCallback(
    () => setIsFilterModalVisible(true),
    [setIsFilterModalVisible]
  );

  if (isLoading) {
    return (
      <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
        <ImageBackground
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          source={require('../assets/images/groups_bg.png')}
          style={styles.backgroundImage}
        />

        <Text XXL bold style={styles.headerTitle}>
          GROUPS
        </Text>

        <View style={styles.searchBar}>
          <SearchBar
            onChangeText={(value: string) => setSearchString(value)}
            value={searchString}
          />
        </View>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={loadingData}
          keyExtractor={({ Id }) => Id.toString()}
          renderItem={() => <GroupCardPlaceholder />}
          style={styles.list}
        />
      </View>
    );
  }

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <ImageBackground
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        source={require('../assets/images/groups_bg.png')}
        style={styles.backgroundImage}
      />

      <Text XXL bold style={styles.headerTitle}>
        GROUPS
      </Text>

      <View style={styles.searchBar}>
        <SearchBar
          onChangeText={(value: string) => setSearchString(value)}
          value={searchString}
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

      {groups?.length ? (
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={groups}
          keyExtractor={({ Id }) => Id.toString()}
          ref={ref}
          renderItem={({ item }) => <Card item={item} />}
          style={styles.list}
        />
      ) : (
        <NoResults
          numberOfFiltersApplied={numberOfFiltersApplied}
          searchString={searchString}
          setSearchString={setSearchString}
          showFilterModal={showFilterModal}
        />
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
    backgroundColor: Colors.blue,
    borderRadius: 10,
    height: 20,
    position: 'absolute',
    right: 0,
    top: 0,
    width: 20,
  },
  badgeCount: { paddingTop: 1 },
  button: { marginTop: 20 },
  card: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardShadow: {
    elevation: 8,
    shadowColor: Colors.black,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  contentContainer: {
    paddingTop: 16,
  },
  filter: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 80,
  },
  headerTitle: {
    color: Colors.red,
    marginLeft: 16,
    marginVertical: 10,
  },
  list: {
    height: '100%',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  mainContainer: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  noResults: { paddingHorizontal: 20 },
  noResultsHeader: { marginTop: 10 },
  searchBar: {
    flexDirection: 'row',
    flexShrink: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
});

export default GroupsScreen;
