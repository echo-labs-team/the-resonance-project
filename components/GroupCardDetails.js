// @flow

import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import Text from '../components/Text';
import Colors from '../constants/Colors';
import {
  getCampusCode,
  getMeetingFrequency,
  getMeetingDay,
  getMeetingTime,
} from '../utils/groups';

export default ({
  navigation,
  item,
}: {
  navigation: { navigate: Function },
  item: {
    groupname: string,
    campus: string,
    frequency: string,
    interval: string,
    daysOfWeek: Array<string>,
    dayOfMonth: Array<string>,
    meetingTime: string,
    description: string,
  },
}) => {
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

        <View style={styles.descriptionWrapper}>
          <Text numberOfLines={4} style={styles.description}>
            {description}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export const styles = StyleSheet.create({
  cardHighlight: { borderRadius: 16 },
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
  descriptionWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    padding: 10,
    fontSize: 16,
    lineHeight: 24,
    color: Colors.gray,
  },
});
