import React, { useState, useEffect } from 'react';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import * as Amplitude from 'expo-analytics-amplitude';
import htmlParser from 'fast-html-parser';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import Text from '../components/Text';
import Button from '../components/Button';

const storeMissionsData = async missions => {
  await AsyncStorage.setItem('@missions', missions).catch(err =>
    console.error(err)
  );
};

const MissionsScreen = () => {
  const [missions, setMissions] = useState('');

  useEffect(() => {
    const getMissionsContent = async () => {
      const storedMissionsData = await AsyncStorage.getItem(
        '@missions'
      ).catch(err => console.error(err));

      if (storedMissionsData) {
        setMissions(storedMissionsData);
      }

      // get data from the missions page in WordPress
      const { data = [] } =
        (await axios.get(
          'http://echo.church/wp-json/wp/v2/pages?slug=missions'
        )) || {};
      const [{ content: { rendered = '' } = {} } = {}] = data;

      // parse the HTML that we get back
      const $ = htmlParser.parse(rendered);

      // get all the headers, which are the different mission trips
      const [, ...headers] = $.querySelectorAll('#global h2');
      const places = headers
        .map(({ childNodes = [] }) => {
          const [{ structuredText: header } = {}] = childNodes;

          return header;
        })
        .join(', ');

      setMissions(places);
      storeMissionsData(places);
    };

    getMissionsContent();
  }, []);

  return (
    <ScrollView style={styles.mainContainer} {...getHeaderInset()}>
      <Image
        source={require('../assets/images/missions.png')}
        style={styles.image}
      />
      <View style={styles.container}>
        <Text style={styles.heading}>Echoing Around the World</Text>
        <Text style={styles.content}>
          Mission trips give Echo.Church a chance to serve and encourage our
          partner churches and missionaries around the world, as well as an
          opportunity for our faith to be stretched and our eyes to be opened to
          what God is doing beyond our region.
        </Text>

        <Text bold style={[styles.heading, { fontSize: 24 }]}>
          Current mission trips
        </Text>
        {missions ? (
          <Text bold style={styles.subHeading}>
            {missions}
          </Text>
        ) : (
          <Placeholder
            Animation={props => (
              <Fade {...props} style={{ backgroundColor: Colors.darkGray }} />
            )}
          >
            <PlaceholderLine height={40} style={styles.loader} />
          </Placeholder>
        )}

        <Button
          title="Learn More"
          style={styles.button}
          onPress={() => {
            Amplitude.logEventWithProperties('mobileEngagementAction', {
              app: 'mobile',
              connect: 'Missions More Info',
            });

            WebBrowser.openBrowserAsync(
              'https://echo.church/missions/#global',
              {
                toolbarColor: Colors.darkestGray,
              }
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

MissionsScreen.navigationOptions = {
  headerTitle: () => <Text style={styles.header}>Missions</Text>,
};

const styles = StyleSheet.create({
  header: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 26,
    color: Colors.white,
  },
  mainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    backgroundColor: Colors.darkestGray,
  },
  image: {
    width: '100%',
    height: 250,
  },
  container: { paddingVertical: 20, paddingHorizontal: 16 },
  loader: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: Colors.darkestGray,
  },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    lineHeight: 32,
    color: Colors.white,
  },
  subHeading: {
    marginVertical: 10,
    fontSize: 18,
    color: Colors.white,
  },
  content: {
    marginBottom: 20,
    fontSize: 16,
    color: Colors.gray,
  },
  button: { marginVertical: 20 },
});

export default MissionsScreen;
