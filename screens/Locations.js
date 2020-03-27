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
import * as Amplitude from 'expo-analytics-amplitude';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';
import Text from '../components/shared/Text';
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

  Amplitude.logEventWithProperties('TAP Location', { campus: location });
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
            <Text style={styles.warning}>
              Due to COVID-19, all services on physical locations are hosted
              online.
            </Text>
            <Button
              title="Watch Church Online"
              style={{ marginBottom: 20 }}
              onPress={() => {
                WebBrowser.openBrowserAsync('https://live.echo.church', {
                  toolbarColor: Colors.darkestGray,
                }).catch((err) => {
                  Amplitude.logEventWithProperties('ERROR with WebBrowser', {
                    error: err,
                  });
                  WebBrowser.dismissBrowser();
                });
              }}
            />

            <Text style={styles.heading}>
              All Echo.Church locations & regular service times
            </Text>

            <View style={styles.location}>
              <TouchableHighlight
                underlayColor={Colors.darkBlue}
                onPress={() => openMaps('NSJ')}
                style={{ borderRadius: 4 }}
              >
                <Text style={styles.content}>
                  North San Jose | 1180 Murphy Ave
                </Text>
              </TouchableHighlight>
              <Text style={styles.subContent}>
                8:30AM • 10:00AM • 11:30AM • 4:00PM • 5:30PM
              </Text>
            </View>
            <View style={styles.location}>
              <TouchableHighlight
                underlayColor={Colors.darkBlue}
                onPress={() => openMaps('SSJ')}
                style={{ borderRadius: 4 }}
              >
                <Text style={styles.content}>
                  South San Jose | 6150 Snell Ave
                </Text>
              </TouchableHighlight>
              <Text style={styles.subContent}>9:30AM • 11:00AM</Text>
            </View>
            <View style={styles.location}>
              <TouchableHighlight
                underlayColor={Colors.darkBlue}
                onPress={() => openMaps('SVL')}
                style={{ borderRadius: 4 }}
              >
                <Text style={styles.content}>
                  Sunnyvale | 1145 E Arques Ave
                </Text>
              </TouchableHighlight>
              <Text style={styles.subContent}>9:30AM • 11:00AM</Text>
            </View>
            <View style={styles.location}>
              <TouchableHighlight
                underlayColor={Colors.darkBlue}
                onPress={() => openMaps('FMT')}
                style={{ borderRadius: 4 }}
              >
                <Text style={styles.content}>Fremont | 48989 Milmont Dr</Text>
              </TouchableHighlight>
              <Text style={styles.subContent}>9:30AM • 11:00AM</Text>
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
  warning: {
    marginVertical: 10,
    fontSize: 28,
    lineHeight: 32,
    color: Colors.red,
    textAlign: 'center',
  },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    lineHeight: 32,
    color: Colors.white,
    textAlign: 'center',
  },
  location: {
    marginBottom: 20,
  },
  content: {
    fontSize: 22,
    color: Colors.blue,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  subContent: {
    paddingHorizontal: 8,
    fontSize: 20,
    color: Colors.gray,
    textAlign: 'center',
  },
});

export default LocationsScreen;
