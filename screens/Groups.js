// @flow

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import Placeholder, { Line } from 'rn-placeholder';
import Text from '../components/Text';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import { getOpenGroups, getCategories } from '../data/groups';
import {
  getCampusCode,
  getMeetingFrequency,
  getMeetingDay,
  getMeetingTime,
} from '../utils/groups';

const CardDetails = ({ navigation, item }) => {
  const {
    groupname = '',
    campus,
    frequency,
    interval,
    daysOfWeek,
    dayOfMonth,
    meetingTime,
    description,
  } = item;

  const titleParts = groupname.split('-');

  titleParts.shift();

  const title = titleParts.join(' ').trim();

  return (
    <TouchableHighlight
      style={styles.cardHighlight}
      underlayColor={Colors.darkBlue}
      onPress={() =>
        navigation.navigate('GroupDetails', {
          group: { ...item, title },
        })
      }
    >
      <View style={styles.group}>
        <Text light adjustsFontSizeToFit numberOfLines={2} style={styles.title}>
          {title}
        </Text>

        <View style={styles.when}>
          <Text style={styles.detail}>
            {getMeetingFrequency(frequency, interval)} on{' '}
            <Text bold style={[styles.detail, styles.b]}>
              {getMeetingDay(daysOfWeek, dayOfMonth)}
            </Text>{' '}
            at{' '}
            <Text bold style={[styles.detail, styles.b]}>
              {getMeetingTime(meetingTime)}
            </Text>
          </Text>
        </View>

        <View style={styles.details}>
          <Text bold style={styles.detail}>
            {getCampusCode(campus)}
          </Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text numberOfLines={4} style={styles.description}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const Card = ({ navigation, index, numberOfGroups, item }) => {
  const isLastCard = index === numberOfGroups;
  const lastCardStyles = { marginBottom: 60 };

  return (
    <View style={[styles.card, isLastCard && lastCardStyles]}>
      <Placeholder
        isReady={!item.uuid.includes('loading')}
        animation="fade"
        whenReadyRender={() => (
          <CardDetails navigation={navigation} item={item} />
        )}
        style={styles.placeholder}
      >
        <Line width="70%" height={40} />
        <Line />
        <Line width={40} />
        <Line width="80%" />
        <Line width="70%" />
        <Line width="80%" />
        <Line width="70%" />
        <Line width="60%" />
        <Line width="70%" />
        <Line width="60%" />
      </Placeholder>
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
        source={require('../assets/images/fall_leaves_bg.png')}
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

export const styles = StyleSheet.create({
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
    opacity: 0.25,
  },
  list: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  separator: { height: 20 },
  cardHighlight: { borderRadius: 16 },
  card: {
    borderRadius: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: Colors.darkerGray,
  },
  placeholder: { padding: 20 },
  group: {
    height: 300,
    padding: 20,
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  title: {
    marginBottom: 10,
    fontSize: 28,
    color: Colors.white,
  },
  details: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detail: {
    fontSize: 16,
    color: Colors.gray,
  },
  b: { fontSize: 18 },
  when: {
    marginBottom: 10,
    justifyContent: 'center',
  },
  description: {
    padding: 10,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.gray,
  },
});

export default GroupsScreen;
