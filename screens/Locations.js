import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import logEvent from '../utils/logEvent';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';
import { Title, Subtitle, Heading } from '../components/shared/Typography';
import Button from '../components/shared/Button';
const openMaps = (location) => {
  let url = '';

  switch (location) {
    case 'NSJ':
      url = 'https://goo.gl/maps/ajffUADmH93PXyJ96';
      break;

    case 'SSJ':
      url = 'https://goo.gl/maps/eMW9nvBWu4eJrxzR9';
      break;

    case 'SVL':
      url = 'https://goo.gl/maps/RbNmdcRiGuBu6XNU6';
      break;

    case 'FMT':
      url = 'https://goo.gl/maps/y58xwE9LwXdRcU8g7';
      break;

    default:
      break;
  }

  logEvent('TAP Location', { campus: location });
  Linking.openURL(url);
};

const LocationsScreen = () => {
  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
        <ScrollView
          style={[styles.mainContainer, { paddingTop: headerHeight }]}
        >
          <Image
            source={require('../assets/images/campuses.png')}
            style={styles.image}
          />
          <View style={[styles.container, { paddingBottom: headerHeight }]}>
            <Button
              title="Watch Church Online"
              style={styles.button}
              onPress={() => {
                WebBrowser.openBrowserAsync('https://echo.online.church/', {
                  toolbarColor: Colors.darkestGray,
                }).catch((err) => {
                  logEvent('ERROR with WebBrowser', { error: err });
                  WebBrowser.dismissBrowser();
                });
              }}
            />

            <Title center style={styles.heading}>
              All Echo.Church locations & regular service times
            </Title>

            <View style={styles.location}>
              <TouchableHighlight
                underlayColor={Colors.darkBlue}
                onPress={() => openMaps('NSJ')}
                style={styles.highlight}
              >
                <Subtitle center style={styles.content}>
                  North San Jose | 1180 Murphy Ave, San Jose, CA 95131
                </Subtitle>
              </TouchableHighlight>
              <Heading center style={styles.subContent}>
                Every Sunday at 8:30am, 10:00am, or 11:30am
              </Heading>
            </View>
            <View style={styles.location}>
              <TouchableHighlight
                underlayColor={Colors.darkBlue}
                onPress={() => openMaps('SVL')}
                style={styles.highlight}
              >
                <Subtitle center style={styles.content}>
                  Sunnyvale | 1145 E Arques Ave, Sunnyvale, CA 94085
                </Subtitle>
              </TouchableHighlight>
              <Heading center style={styles.subContent}>
                Every Sunday at 9:30am or 11:00am
              </Heading>
            </View>
            <View style={styles.location}>
              <TouchableHighlight
                underlayColor={Colors.darkBlue}
                onPress={() => openMaps('FMT')}
                style={styles.highlight}
              >
                <Subtitle center style={styles.content}>
                  Fremont/Crossroads | 41386 Fremont Blvd, Fremont, CA 94538
                  (Crossroads campus)
                </Subtitle>
              </TouchableHighlight>
              <Heading center style={styles.subContent}>
                Every Sunday at 10:00am or 11:30am
              </Heading>
            </View>
          </View>
        </ScrollView>
      )}
    </HeaderHeightContext.Consumer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    backgroundColor: Colors.white,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  button: { marginBottom: 20 },
  heading: { marginVertical: 10 },
  highlight: { borderRadius: 4 },
  location: {
    marginBottom: 30,
  },
  content: {
    color: Colors.blue,
    textDecorationLine: 'underline',
  },
  subContent: {
    paddingHorizontal: 8,
    marginBottom: 10,
  },
});

export default LocationsScreen;
