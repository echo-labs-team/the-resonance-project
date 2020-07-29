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
      url = 'https://goo.gl/maps/n8DuNmh4TeC1PfnJ6';
      break;

    case 'SSJ':
      url = 'https://goo.gl/maps/aPkDFFwUndfPG37Y9';
      break;

    case 'SVL':
      url = 'https://goo.gl/maps/U3kTYP3Pr1aphNHF7';
      break;

    case 'FMT':
      url = 'https://goo.gl/maps/rVDi8CGHQESyDYfw7';
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
            source={require('../assets/images/locations.png')}
            style={styles.image}
          />
          <View style={[styles.container, { paddingBottom: headerHeight }]}>
            <Title center style={styles.warning}>
              Due to COVID-19, all services on physical locations are hosted
              online.
            </Title>
            <Button
              title="Watch Church Online"
              style={styles.button}
              onPress={() => {
                WebBrowser.openBrowserAsync('https://live.echo.church', {
                  toolbarColor: Colors.darkestGray,
                }).catch((err) => {
                  logEvent('ERROR with WebBrowser', { error: err.message });
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
                  North San Jose | 1180 Murphy Ave
                </Subtitle>
              </TouchableHighlight>
              <Heading center style={styles.subContent}>
                8:30AM • 10:00AM • 11:30AM • 4:00PM • 5:30PM
              </Heading>
            </View>
            <View style={styles.location}>
              <TouchableHighlight
                underlayColor={Colors.darkBlue}
                onPress={() => openMaps('SSJ')}
                style={styles.highlight}
              >
                <Subtitle center style={styles.content}>
                  South San Jose | 6150 Snell Ave
                </Subtitle>
              </TouchableHighlight>
              <Heading center style={styles.subContent}>
                9:30AM • 11:00AM
              </Heading>
            </View>
            <View style={styles.location}>
              <TouchableHighlight
                underlayColor={Colors.darkBlue}
                onPress={() => openMaps('SVL')}
                style={styles.highlight}
              >
                <Subtitle center style={styles.content}>
                  Sunnyvale | 1145 E Arques Ave
                </Subtitle>
              </TouchableHighlight>
              <Heading center style={styles.subContent}>
                9:30AM • 11:00AM
              </Heading>
            </View>
            <View style={styles.location}>
              <TouchableHighlight
                underlayColor={Colors.darkBlue}
                onPress={() => openMaps('FMT')}
                style={styles.highlight}
              >
                <Subtitle center style={styles.content}>
                  Fremont | 48989 Milmont Dr
                </Subtitle>
              </TouchableHighlight>
              <Heading center style={styles.subContent}>
                9:30AM • 11:00AM
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
  warning: { color: Colors.red },
  button: { marginBottom: 20 },
  heading: { marginVertical: 10 },
  highlight: { borderRadius: 4 },
  location: {
    marginBottom: 20,
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
