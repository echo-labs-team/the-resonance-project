// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
  Text,
} from 'react-native';
import { WebBrowser, Svg } from 'expo';
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { getOpenGroups, getCategories } from '../data/groups';
import {
  getCampusCode,
  getMeetingFrequency,
  getMeetingDay,
  getMeetingTime,
} from '../utils/groups';

const Loader = () => {
  const width = Layout.window.width - 60;

  return (
    <SvgAnimatedLinearGradient
      width={width}
      height={300}
      x2="200%"
      primaryColor={Colors.darkGray}
      secondaryColor={Colors.darkestGray}
    >
      <Svg.Rect x="0" y="0" rx="4" ry="4" width="300" height="28" />
      <Svg.Rect x="0" y="44" rx="4" ry="4" width="50" height="8" />
      <Svg.Rect x="80" y="44" rx="4" ry="4" width="50" height="8" />
      <Svg.Rect x="160" y="44" rx="4" ry="4" width="50" height="8" />
      <Svg.Rect x="240" y="44" rx="4" ry="4" width="30" height="8" />
      <Svg.Rect x="0" y="70" rx="5" ry="5" width={width} height="190" />
    </SvgAnimatedLinearGradient>
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

  handleOpenGroups = () => {
    WebBrowser.openBrowserAsync('https://stage.groups.echo.church');
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
          renderItem={({ item }) => {
            const {
              uuid,
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
              <View style={styles.card}>
                {uuid.includes('loading') ? (
                  <View style={styles.group}>
                    <Loader />
                  </View>
                ) : (
                  <View style={styles.group}>
                    <Text
                      adjustsFontSizeToFit
                      numberOfLines={2}
                      style={styles.title}
                    >
                      {groupTitleParts.join(' ').trim()}
                    </Text>
                    <View style={styles.details}>
                      <Text style={styles.detail}>
                        {getMeetingFrequency(frequency, interval)}
                      </Text>
                      <Text style={styles.detail}>
                        {getMeetingDay(daysOfWeek, dayOfMonth)}
                      </Text>
                      <Text style={styles.detail}>
                        {getMeetingTime(meetingTime)}
                      </Text>
                    </View>
                    <View style={styles.details}>
                      <Text style={[styles.detail, styles.bold]}>
                        {getCampusCode(campus)}
                      </Text>
                    </View>
                    <Text numberOfLines={6} style={styles.description}>
                      {description}
                    </Text>
                  </View>
                )}
              </View>
            );
          }}
          style={styles.list}
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
  list: { padding: 10 },
  separator: { height: 20 },
  card: {
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 8,
    backgroundColor: Colors.darkerGray,
  },
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
