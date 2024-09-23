import { Feather } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRef } from 'react';
import {
  ImageBackground,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import Hyperlink from 'react-native-hyperlink';
import { useSafeArea } from 'react-native-safe-area-context';
import Ask from '../components/AskAboutGroupModal';
import Address from '../components/GroupAddress';
import { styles as groupStyles } from '../components/GroupCardDetails';
import Location from '../components/GroupLocation';
import SignUp from '../components/JoinGroupModal';
import Leader from '../components/Leader';
import Button from '../components/shared/Button';
import { Heading, Text, Title } from '../components/shared/Typography';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import logEvent from '../utils/logEvent';

function GroupDetails({ route }) {
  const insets = useSafeArea();
  const headerHeight = useHeaderHeight();
  const scrollViewRef = useRef(null);
  const dropdownAlertRef = useRef(null);

  function showSuccess(message) {
    if (scrollViewRef.current && dropdownAlertRef.current) {
      scrollViewRef.current.scrollTo({ animated: true, x: 0, y: -100 });
      dropdownAlertRef.current.alertWithType('success', 'Success!', message);
    }
  }

  const {
    AudienceName,
    City,
    Description,
    FriendlyScheduleText,
    GroupCampus,
    GroupPhotoGuid,
    Id,
    LeaderNames,
    Name = '',
    Online: isOnline,
  } = route.params?.group ?? {};

  const isWomenOnly = AudienceName.includes('Women');
  const isMenOnly = AudienceName.includes('Men');
  const shouldShowLocation = Boolean(isOnline || City);
  const shouldShowAddress = Boolean(!isOnline && City);
  const shouldShowLeaders = Boolean(LeaderNames);

  const onShare = async () => {
    logEvent('TAP Group Share', { group: Name });

    try {
      const result = await Share.share({
        message: `Check out this Echo Group: ${Name}`,
        title: 'Echo Groups',
        url: `https://rock.echo.church/groupfinder?GroupId=${Id}`,
      });

      const { action, activityType = 'unknown' } = result;

      if (action === Share.sharedAction) {
        logEvent('SHARED Group', {
          activityType,
          group: Name,
        });
      }
    } catch (error) {
      logEvent('ERROR sharing group', { error, group: Name });
    }
  };

  return (
    <View style={[styles.mainContainer, { paddingTop: headerHeight }]}>
      <ImageBackground
        source={require('../assets/images/groups_bg.png')}
        style={styles.backgroundImage}
      />

      <ScrollView ref={scrollViewRef} style={styles.container}>
        <Title
          adjustsFontSizeToFit
          light
          numberOfLines={4}
          style={groupStyles.title}
        >
          {Name}
        </Title>

        <View style={groupStyles.when}>
          <Text>{FriendlyScheduleText.replace(/<[^>]*>/g, '')}</Text>
        </View>

        <View style={[groupStyles.details, { marginBottom: 16 }]}>
          <Heading>{GroupCampus}</Heading>
        </View>

        {isWomenOnly ? (
          <View style={[groupStyles.details, { marginBottom: 16 }]}>
            <Text light>👩 WOMEN ONLY</Text>
          </View>
        ) : null}
        {isMenOnly ? (
          <View style={[groupStyles.details, { marginBottom: 16 }]}>
            <Text light>👨 MEN ONLY</Text>
          </View>
        ) : null}

        {shouldShowLocation ? (
          <Location city={City} isOnline={isOnline} />
        ) : null}

        {shouldShowAddress ? <Address city={City} title={Name} /> : null}

        {shouldShowLeaders ? (
          <View style={{ marginBottom: 16 }}>
            <Heading>Host(s)</Heading>
            <Leader
              names={LeaderNames}
              photo={`https://rock.echo.church/GetImage.ashx?guid=${GroupPhotoGuid}&width=100&height=100&mode=crop`}
            />
          </View>
        ) : null}

        {/* make any links clickable */}
        <Hyperlink linkDefault>
          <Text style={{ marginVertical: 20 }}>{Description}</Text>
        </Hyperlink>

        <SignUp groupID={Id} showSuccess={showSuccess} title={Name} />
        <Ask groupID={Id} showSuccess={showSuccess} title={Name} />
        <Button
          icon={<Feather color={Colors.gray} name="share" size={24} />}
          onPress={onShare}
          style={{
            marginBottom:
              Platform.OS === 'ios' ? insets.bottom : insets.bottom + 20,
          }}
          title="Share"
        />

        <DropdownAlert
          ref={dropdownAlertRef}
          renderImage={() => (
            <Feather
              color={Colors.white}
              name="check-circle"
              size={30}
              style={{ alignSelf: 'center', padding: 8 }}
            />
          )}
          successColor={Colors.blue}
          wrapperStyle={{ marginTop: Platform.OS === 'ios' ? 0 : 80 }}
          zIndex={1}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: Layout.window.height,
    left: 0,
    opacity: 0.75,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  mainContainer: {
    backgroundColor: Colors.black,
    flex: 1,
    position: 'relative',
  },
});

export default GroupDetails;
