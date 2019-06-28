// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Text,
} from 'react-native';
import Placeholder, { Line } from 'rn-placeholder';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import { getOpenGroups, getCategories } from '../data/groups';
import {
  getCampusCode,
  getMeetingFrequency,
  getMeetingDay,
  getMeetingTime,
} from '../utils/groups';

const CardDetails = ({ item }) => {
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

  const groupTitleParts = groupname.split('-');

  groupTitleParts.shift();

  return (
    <View style={styles.group}>
      <Text adjustsFontSizeToFit numberOfLines={2} style={styles.title}>
        {groupTitleParts.join(' ').trim()}
      </Text>
      <View style={styles.details}>
        <Text style={styles.detail}>
          {getMeetingFrequency(frequency, interval)}
        </Text>
        <Text style={styles.detail}>
          {getMeetingDay(daysOfWeek, dayOfMonth)}
        </Text>
        <Text style={styles.detail}>{getMeetingTime(meetingTime)}</Text>
      </View>
      <View style={styles.details}>
        <Text style={[styles.detail, styles.bold]}>
          {getCampusCode(campus)}
        </Text>
      </View>
      <Text numberOfLines={5} style={styles.description}>
        {description}
      </Text>
    </View>
  );
};

const Card = ({ index, numberOfGroups, item }) => {
  const isLastCard = index === numberOfGroups;
  const lastCardStyles = { marginBottom: 60 };

  return (
    <View style={[styles.card, isLastCard && lastCardStyles]}>
      <Placeholder
        isReady={!item.uuid.includes('loading')}
        animation="fade"
        whenReadyRender={() => <CardDetails item={item} />}
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

type Props = {
  navigation: Object,
};

type State = {
  groups: Array<Object>,
  categories: Array<string>,
};

export default class GroupsScreen extends Component<Props, State> {
  static navigationOptions = {
    title: 'GROUPS',
  };

  state = {
    groups: [
      { uuid: 'loading1' },
      { uuid: 'loading2' },
      { uuid: 'loading3' },
      { uuid: 'loading4' },
      { uuid: 'loading5' },
      { uuid: 'loading6' },
      { uuid: 'loading7' },
      { uuid: 'loading8' },
    ],
    categories: [],
  };

  componentDidMount = async () => {
    const [groups, categories] = await Promise.all([
      getOpenGroups(),
      getCategories(),
    ]);

    this.setState({ groups, categories });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <ImageBackground
          source={require('../assets/images/fall_leaves_bg.png')}
          style={styles.backgroundImage}
        />
        <FlatList
          keyExtractor={({ uuid }) => uuid}
          data={this.state.groups}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ index, item }) => (
            <Card
              index={index}
              numberOfGroups={this.state.groups.length - 1}
              item={item}
            />
          )}
          style={styles.list}
          {...getHeaderInset()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bold: {
    fontWeight: '800',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    opacity: 0.3,
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
  description: {
    padding: 10,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.gray,
  },
});
