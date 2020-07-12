import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';
import * as Amplitude from 'expo-analytics-amplitude';
import Colors from '../constants/Colors';
import { Text, Title } from '../components/shared/Typography';
import Button from '../components/shared/Button';

const ActivateScreen = () => {
  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
        <ScrollView
          style={[styles.mainContainer, { paddingTop: headerHeight }]}
        >
          <Image
            source={require('../assets/images/activate.png')}
            style={styles.image}
          />
          <View style={[styles.container, { paddingBottom: headerHeight }]}>
            <Title style={styles.heading}>Your next steps</Title>
            <Text style={styles.content}>
              Activate is about you and the environments we design at
              Echo.Church that can lead you to discover your purpose, develop
              friendships, and make a difference. Activate is a free dinner
              experience where we can get to know you and give you a glimpse of
              what being connected at Echo.Church is all about.
            </Text>

            <Button
              title="RSVP Here"
              style={styles.button}
              onPress={() => {
                Amplitude.logEvent('TAP Activate RSVP');
                WebBrowser.openBrowserAsync(
                  'https://docs.google.com/forms/d/e/1FAIpQLSdZ1EBI_kCqt8xtK1n1PBfcBUlHFPl45o-9Ls3O2srwejpjGw/viewform?vc=0&c=0&w=1',
                  { toolbarColor: Colors.darkestGray }
                ).catch((err) => {
                  Amplitude.logEventWithProperties('ERROR with WebBrowser', {
                    error: err.message,
                  });
                  WebBrowser.dismissBrowser();
                });
              }}
            />
          </View>
        </ScrollView>
      )}
    </HeaderHeightContext.Consumer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.darkestGray,
  },
  image: {
    width: '100%',
    height: 220,
    resizeMode: 'contain',
    backgroundColor: Colors.white,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  heading: {
    marginVertical: 10,
  },
  content: {
    marginBottom: 20,
    color: Colors.gray,
  },
  button: { marginVertical: 20 },
});

export default ActivateScreen;
