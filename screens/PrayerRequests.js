import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';
import logEvent from '../utils/logEvent';
import Colors from '../constants/Colors';
import { Text, Title } from '../components/shared/Typography';
import Button from '../components/shared/Button';

const PrayerRequestsScreen = () => {
  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
        <ScrollView
          style={[styles.mainContainer, { paddingTop: headerHeight }]}
        >
          <Image
            source={require('../assets/images/pray.jpg')}
            style={styles.image}
          />
          <View style={[styles.container, { paddingBottom: headerHeight }]}>
            <Title style={styles.heading}>How can we pray for you?</Title>
            <Text style={styles.content}>
              Let us pray for you. We invite you to contact us during difficult
              times.
            </Text>

            <Button
              title="Submit Prayer Request"
              style={styles.button}
              onPress={() => {
                logEvent('TAP Prayer Request Submit');
                WebBrowser.openBrowserAsync(
                  'https://echo.church/prayerrequest',
                  { toolbarColor: Colors.darkestGray }
                ).catch((err) => {
                  logEvent('ERROR with WebBrowser', { error: err });
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
  },
  content: { marginBottom: 20 },
  button: { marginVertical: 20 },
});

export default PrayerRequestsScreen;
