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
import logEvent from '../utils/logEvent';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { Text, Title, Heading } from '../components/shared/Typography';
import Button from '../components/shared/Button';
import { styles as groupStyles } from '../components/GroupCardDetails';
import Location from '../components/GroupLocation';
import Address from '../components/GroupAddress';
import Leader from '../components/Leader';
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
    Id,
    Name = '',
    GroupCampus,
    FriendlyScheduleText,
    Description,
    LeaderNames,
    GroupPhotoGuid,
    City,
    Online: isOnline,
    AudienceName,
  } = route.params?.group ?? {};

  const isWomenOnly = AudienceName.includes('Women Only');
  const isMenOnly = AudienceName.includes('Men Only');
  const shouldShowLocation = Boolean(isOnline || City);
  const shouldShowAddress = Boolean(!isOnline && City);
  const shouldShowLeaders = Boolean(LeaderNames);

  const onShare = async () => {
    logEvent('TAP Group Share', {
      group: Name,
    });

    try {
      const result = await Share.share({
        title: 'Echo Groups',
        message: `Check out this Echo Group: ${Name}`,
        url: `https://rock.echo.church/groupfinder?GroupId=${Id}`,
      });

      const { action, activityType = 'unknown' } = result;

      if (action === Share.sharedAction) {
        logEvent('SHARED Group', {
          group: Name,
          activityType,
        });
      }
    } catch (error) {
      logEvent('ERROR sharing group', { group: Name, error });
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
              {Name}
            </Title>

            <View style={groupStyles.when}>
              <Text>{FriendlyScheduleText}</Text>
            </View>

            <View style={[groupStyles.details, { marginBottom: 16 }]}>
              <Heading>{GroupCampus}</Heading>
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

            {shouldShowLocation && <Location isOnline={isOnline} city={City} />}

            {shouldShowAddress && <Address title={Name} city={City} />}

            {shouldShowLeaders && (
              <View style={{ marginBottom: 16 }}>
                <Heading>Host(s)</Heading>
                <Leader
                  names={LeaderNames}
                  photo={`https://rock.echo.church/GetImage.ashx?guid=${GroupPhotoGuid}&width=100&height=100&mode=crop`}
                />
              </View>
            )}

            {/* make any links clickable */}
            <Hyperlink linkDefault>
              <Text style={{ marginVertical: 20 }}>{Description}</Text>
            </Hyperlink>

            <SignUp groupID={Id} title={Name} showSuccess={showSuccess} />
            <Ask groupID={Id} title={Name} showSuccess={showSuccess} />
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
