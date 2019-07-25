// @flow

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import { getOpenGroups, getCategories } from '../data/groups';
import GroupCardPlaceholder from '../components/GroupCardPlaceholder';
import GroupCardDetails from '../components/GroupCardDetails';

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

      setCategories(fetchedCategories.map(({ name } = {}) => name));
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
        data={groups}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ index, item }) => (
          <Card
            navigation={navigation}
            index={index}
            numberOfGroups={groups.length - 1}
            item={item}
          />
        )}
        style={styles.list}
        {...getHeaderInset()}
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
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  list: {
    paddingTop: 20,
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
