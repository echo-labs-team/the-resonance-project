import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logEvent from '../utils/logEvent';
import { Text, Title } from '../components/shared/Typography';
import Colors from '../constants/Colors';
import {
  getMeetingFrequency,
  getMeetingDay,
  getMeetingTime,
} from '../utils/groups';

export default ({ item }) => {
  const navigation = useNavigation();
  const {
    name = '',
    campus,
    frequency,
    interval,
    daysOfWeek,
    dayOfMonth,
    meetingTime,
    description,
  } = item;
  const titleParts = name.split('-');

  if (titleParts.length > 1) {
    titleParts.shift();
  }

  const title = titleParts.join(' ').trim();

  return (
    <TouchableHighlight
      testID="GroupCardDetails"
      style={styles.group}
      underlayColor={Colors.darkestGray}
      onPress={() => {
        logEvent('OPEN Group Details', {
          group: title,
        });
        navigation.navigate('GroupDetails', {
          group: { ...item, title },
        });
      }}
    >
      <View>
        <Title
          light
          adjustsFontSizeToFit
          numberOfLines={2}
          style={styles.title}
        >
          {title}
        </Title>

        <Text style={styles.detail}>
          {getMeetingFrequency(frequency, interval)} on{' '}
          <Text bold>{getMeetingDay(daysOfWeek, dayOfMonth)}</Text> at{' '}
          <Text bold>{getMeetingTime(meetingTime)}</Text>
        </Text>

        <Text bold style={styles.detail}>
          {campus}
        </Text>

        <Text light numberOfLines={3} ellipsizeMode="tail">
          {description}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export const styles = StyleSheet.create({
  group: {
    padding: 16,
    position: 'relative',
    borderRadius: 16,
  },
  title: {
    marginVertical: 10,
  },
  detail: {
    marginBottom: 10,
  },
});
