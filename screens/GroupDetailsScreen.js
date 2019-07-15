// @flow

import React, { useRef } from 'react';
import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import DropdownAlert from 'react-native-dropdownalert';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import Text from '../components/Text';
import { styles as groupStyles } from './Groups';
import {
  getCampusCode,
  getMeetingFrequency,
  getMeetingDay,
  getMeetingTime,
} from '../utils/groups';
import Location from '../components/GroupLocation';
import Address from '../components/GroupAddress';
import SignUp from '../components/JoinGroupModal';
import Ask from '../components/AskAboutGroupModal';

const GroupDetails = ({ navigation }: { navigation: Object }) => {
  const scrollViewRef = useRef(null);
  const dropdownAlertRef = useRef(null);

  function handleSuccess() {
    if (scrollViewRef.current && dropdownAlertRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: -100, animated: true });
      dropdownAlertRef.current.alertWithType(
        'success',
        'Success!',
        'Thanks for joining ☺️'
      );
    }
  }

  const {
    uuid,
    title = '',
    campus,
    frequency,
    interval,
    daysOfWeek,
    dayOfMonth,
    meetingTime,
    description,
    leaders: { leaders = [] } = {},
    location = {
      address: {},
      description: '',
      isOnline: false,
      name: '',
    },
    hasChildcare = false,
  } = navigation.getParam('group', {});

  const isOnline = location.isOnline === 'true';
  const shouldShowLocation = isOnline || location.name || location.description;
  const shouldShowAddress = !isOnline && location?.address?.address1;
  const shouldShowLeaders = leaders.length > 0;

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      {...getHeaderInset()}
    >
      <Text
        light
        adjustsFontSizeToFit
        numberOfLines={2}
        style={groupStyles.title}
      >
        {title}
      </Text>

      <View style={groupStyles.when}>
        <Text style={groupStyles.detail}>
          {getMeetingFrequency(frequency, interval)} on{' '}
          <Text bold style={[groupStyles.detail, groupStyles.b]}>
            {getMeetingDay(daysOfWeek, dayOfMonth)}
          </Text>{' '}
          @{' '}
          <Text bold style={[groupStyles.detail, groupStyles.b]}>
            {getMeetingTime(meetingTime)}
          </Text>
        </Text>
      </View>

      <View style={[groupStyles.details, { marginBottom: 16 }]}>
        <Text bold style={[groupStyles.detail, { fontSize: 18 }]}>
          {getCampusCode(campus)}
        </Text>
      </View>

      {shouldShowLocation && (
        <Location isOnline={isOnline} location={location} />
      )}

      {shouldShowAddress && <Address location={location} />}

      {shouldShowLeaders && (
        <View style={{ marginBottom: 16 }}>
          <Text bold style={{ fontSize: 18, color: Colors.gray }}>
            Leaders
          </Text>
          {leaders.map(({ Name: name }) => (
            <Text key={name} style={{ fontSize: 16, color: Colors.gray }}>
              {name}
            </Text>
          ))}
        </View>
      )}

      <View style={{ marginBottom: 16 }}>
        <Text bold style={{ fontSize: 18, color: Colors.gray }}>
          Childcare
        </Text>
        <Text style={{ fontSize: 16, color: Colors.gray }}>
          {hasChildcare ? 'Provided' : 'Not Provided'}
        </Text>
      </View>

      <Text style={[groupStyles.description, { padding: 0, marginBottom: 20 }]}>
        {description}
      </Text>

      <SignUp groupID={uuid} onSuccess={handleSuccess} />
      <Ask />

      <View style={{ marginBottom: 40 }} />

      {/* $FlowFixMe */}
      <DropdownAlert
        ref={dropdownAlertRef}
        successColor={Colors.blue}
        wrapperStyle={{ marginTop: Platform.OS === 'ios' ? 0 : 80 }}
        renderImage={() => (
          <Feather
            name={'check-circle'}
            size={30}
            color={Colors.white}
            style={{ padding: 8, alignSelf: 'center' }}
          />
        )}
      />
    </ScrollView>
  );
};

GroupDetails.navigationOptions = ({
  navigation,
}: {
  navigation: { state: { params: { group: Object } } },
}) => {
  const {
    state: {
      params: { group: { title = '' } = {} },
    },
  } = navigation;

  return {
    headerTitle: () => (
      <Text adjustsFontSizeToFit numberOfLines={1} style={styles.header}>
        {title}
      </Text>
    ),
  };
};

const styles = StyleSheet.create({
  header: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 26,
    color: Colors.red,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: Colors.darkestGray,
  },
});

export default GroupDetails;
