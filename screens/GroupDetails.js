// @flow

import React, { useRef } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  Share,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import DropdownAlert from 'react-native-dropdownalert';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import Text from '../components/Text';
import Button from '../components/Button';
import { styles as groupStyles } from '../components/GroupCardDetails';
import {
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
    categories = [],
    openDate: {
      startDate: { formatted: startDate = '' } = {},
      endDate: { formatted: endDate = '' } = {},
    } = {},
  } = navigation.getParam('group', {});

  const isWomenOnly = categories.includes('Women Only');
  const isMenOnly = categories.includes('Men Only');
  const isOnline = location.isOnline === 'true';
  const shouldShowLocation = isOnline || location.name || location.description;
  const shouldShowAddress = !isOnline && location?.address?.address1;
  const shouldShowLeaders = leaders.length > 0;

  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'Echo Groups',
        message: `Check out this Echo Group: ${title}`,
        url: `https://groups.echo.church/group/${uuid}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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

        {isWomenOnly && (
          <View style={[groupStyles.details, { marginBottom: 16 }]}>
            <Text light style={[groupStyles.detail, { fontSize: 18 }]}>
              👩 WOMEN ONLY
            </Text>
          </View>
        )}
        {isMenOnly && (
          <View style={[groupStyles.details, { marginBottom: 16 }]}>
            <Text light style={[groupStyles.detail, { fontSize: 18 }]}>
              👨 MEN ONLY
            </Text>
          </View>
        )}

        {shouldShowLocation && (
          <Location isOnline={isOnline} location={location} />
        )}

        {shouldShowAddress && <Address location={location} />}

        {shouldShowLeaders && (
          <View style={{ marginBottom: 16 }}>
            <Text bold style={{ fontSize: 18, color: Colors.gray }}>
              Leaders
            </Text>
            {leaders.map(({ name }) => (
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

        {startDate && (
          <Text
            style={[groupStyles.description, { padding: 0, marginBottom: 20 }]}
          >{`This semester runs from 
${startDate} to ${endDate}`}</Text>
        )}

        <SignUp groupID={uuid} showSuccess={showSuccess} />
        <Ask groupID={uuid} showSuccess={showSuccess} />
        <Button
          icon={<Feather name={'share'} size={24} color={Colors.gray} />}
          title="Share"
          onPress={onShare}
        />

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
  mainContainer: {
    flex: 1,
    position: 'relative',
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
