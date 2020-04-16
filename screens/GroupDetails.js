import React, { useRef } from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { HeaderHeightContext } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import DropdownAlert from 'react-native-dropdownalert';
import Hyperlink from 'react-native-hyperlink';
import * as Amplitude from 'expo-analytics-amplitude';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { Text, Title, Heading } from '../components/shared/Typography';
import Button from '../components/shared/Button';
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

const GroupDetails = ({ route }) => {
  const insets = useSafeArea();
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
  } = route.params?.group ?? {};

  const isWomenOnly = categories.includes('Women Only');
  const isMenOnly = categories.includes('Men Only');
  const isOnline = location.isOnline === 'true';
  const shouldShowLocation = Boolean(
    isOnline || location.name || location.description
  );
  const shouldShowAddress = Boolean(!isOnline && location?.address?.address1);
  const shouldShowLeaders = leaders.length > 0;

  const onShare = async () => {
    Amplitude.logEventWithProperties('TAP Group Share', {
      group: title,
    });

    try {
      const result = await Share.share({
        title: 'Echo Groups',
        message: `Check out this Echo Group: ${title}`,
        url: `https://groups.echo.church/group/${uuid}`,
      });

      const { action, activityType = 'unknown' } = result;

      if (action === Share.sharedAction) {
        Amplitude.logEventWithProperties('SHARED Group', {
          group: title,
          activityType,
        });
      }
    } catch (error) {
      Amplitude.logEventWithProperties('ERROR sharing group', {
        group: title,
      });
    }
  };

  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
        <View style={[styles.mainContainer, { paddingTop: headerHeight }]}>
          <ImageBackground
            source={require('../assets/images/groups_bg.png')}
            style={styles.backgroundImage}
          />

          <ScrollView ref={scrollViewRef} style={styles.container}>
            <Title
              light
              adjustsFontSizeToFit
              numberOfLines={2}
              style={groupStyles.title}
            >
              {title}
            </Title>

            <View style={groupStyles.when}>
              <Text>
                {getMeetingFrequency(frequency, interval)} on{' '}
                <Text bold>{getMeetingDay(daysOfWeek, dayOfMonth)}</Text> at{' '}
                <Text bold>{getMeetingTime(meetingTime)}</Text>
              </Text>
            </View>

            <View style={[groupStyles.details, { marginBottom: 16 }]}>
              <Heading>{campus}</Heading>
            </View>

            {isWomenOnly && (
              <View style={[groupStyles.details, { marginBottom: 16 }]}>
                <Text light>👩 WOMEN ONLY</Text>
              </View>
            )}
            {isMenOnly && (
              <View style={[groupStyles.details, { marginBottom: 16 }]}>
                <Text light>👨 MEN ONLY</Text>
              </View>
            )}

            {shouldShowLocation && (
              <Location isOnline={isOnline} location={location} />
            )}

            {shouldShowAddress && <Address title={title} location={location} />}

            {shouldShowLeaders && (
              <View style={{ marginBottom: 16 }}>
                <Heading>Leaders</Heading>
                {leaders.map(({ name }) => (
                  <Text key={name}>{name}</Text>
                ))}
              </View>
            )}

            <View style={{ marginBottom: 16 }}>
              <Heading>Childcare</Heading>
              <Text>{hasChildcare ? 'Provided' : 'Not Provided'}</Text>
            </View>

            {/* make any links clickable */}
            <Hyperlink linkDefault>
              <Text style={{ marginBottom: 20 }}>{description}</Text>
            </Hyperlink>

            {startDate && (
              <Text
                light
                style={{ marginBottom: 20 }}
              >{`This semester runs from 
${startDate} to ${endDate}`}</Text>
            )}

            <SignUp groupID={uuid} title={title} showSuccess={showSuccess} />
            <Ask groupID={uuid} title={title} showSuccess={showSuccess} />
            <Button
              icon={<Feather name={'share'} size={24} color={Colors.gray} />}
              title="Share"
              onPress={onShare}
              style={{
                marginBottom:
                  Platform.OS === 'ios' ? insets.bottom : insets.bottom + 20,
              }}
            />

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
              zIndex={1}
            />
          </ScrollView>
        </View>
      )}
    </HeaderHeightContext.Consumer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.black,
  },
  backgroundImage: {
    width: '100%',
    height: Layout.window.height,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.75,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default GroupDetails;
