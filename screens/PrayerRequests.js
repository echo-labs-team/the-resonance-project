import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';
import * as Amplitude from 'expo-analytics-amplitude';
import Colors from '../constants/Colors';
import Text from '../components/shared/Text';
import Button from '../components/shared/Button';

const PrayerRequestsScreen = () => {
  return (
    <HeaderHeightContext.Consumer>
      {headerHeight => (
        <ScrollView
          style={[styles.mainContainer, { paddingTop: headerHeight }]}
        >
          <Image
            source={require('../assets/images/pray.jpg')}
            style={styles.image}
          />
          <View style={[styles.container, { paddingBottom: headerHeight }]}>
            <Text style={styles.heading}>How can we pray for you?</Text>
            <Text style={styles.content}>
              Let us pray for you. We invite you to contact us during difficult
              times.
            </Text>

            <Button
              title="Submit Prayer Request"
              style={styles.button}
              onPress={() => {
                Amplitude.logEvent('TAP Prayer Request Submit');
                WebBrowser.openBrowserAsync(
                  'https://docs.google.com/forms/d/e/1FAIpQLScXKoHyYZnqe7HgI0W9ZYYZllrXkDLXQv8pJKmH15oOyRrG0Q/viewform',
                  { toolbarColor: Colors.darkestGray }
                ).catch(err => {
                  Amplitude.logEventWithProperties('ERROR with WebBrowser', {
                    error: err,
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
    height: 250,
  },
  container: { paddingVertical: 20, paddingHorizontal: 16 },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    lineHeight: 32,
    color: Colors.white,
  },
  content: {
    marginBottom: 20,
    fontSize: 16,
    color: Colors.gray,
  },
  button: { marginVertical: 20 },
});

export default PrayerRequestsScreen;
