// @flow

import React, { useRef } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import DropdownAlert from 'react-native-dropdownalert';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import Text from '../components/Text';
import { styles as groupStyles } from '../components/GroupCardDetails';
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

  function showSuccess(message) {
    if (scrollViewRef.current && dropdownAlertRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: -100, animated: true });
      dropdownAlertRef.current.alertWithType('success', 'Success!', message);
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
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../assets/images/groups_bg.png')}
        style={styles.backgroundImage}
      />
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
            at{' '}
            <Text bold style={[groupStyles.detail, groupStyles.b]}>
              {getMeetingTime(meetingTime)}
            </Text>
          </Text>
        </View>

        <View style={[groupStyles.details, { marginBottom: 16 }]}>
          <Text bold style={[groupStyles.detail, { fontSize: 18 }]}>
            {campus}
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

        <Text
          style={[groupStyles.description, { padding: 0, marginBottom: 20 }]}
        >
          {description}
        </Text>

        <SignUp groupID={uuid} showSuccess={showSuccess} />
        <Ask groupID={uuid} showSuccess={showSuccess} />

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
    </View>
  );
};

GroupDetails.navigationOptions = {
  headerTitle: null,
};

const styles = StyleSheet.create({
  header: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 26,
    color: Colors.red,
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
    top: 0,
    left: 0,
    opacity: 0.75,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});

export default GroupDetails;
