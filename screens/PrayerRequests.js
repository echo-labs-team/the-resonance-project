import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import * as Amplitude from 'expo-analytics-amplitude';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import Text from '../components/Text';
import Button from '../components/Button';

const PrayerRequestsScreen = () => {
  const insets = useSafeArea();

  return (
    <ScrollView
      style={[styles.mainContainer, { paddingTop: insets.top }]}
      {...getHeaderInset()}
    >
      <Image
        source={require('../assets/images/pray.jpg')}
        style={styles.image}
      />
      <View style={[styles.container, { paddingBottom: insets.bottom + 16 }]}>
        <Text style={styles.heading}>How can we pray for you?</Text>
        <Text style={styles.content}>
          Let us pray for you. We invite you to contact us during difficult
          times.
        </Text>

        <Button
          title="Submit Prayer Request"
          style={styles.button}
          onPress={() => {
            Amplitude.logEventWithProperties('mobileEngagementAction', {
              app: 'mobile',
              connect: 'Prayer Signup',
            });

            WebBrowser.openBrowserAsync(
              'https://docs.google.com/forms/d/e/1FAIpQLScXKoHyYZnqe7HgI0W9ZYYZllrXkDLXQv8pJKmH15oOyRrG0Q/viewform',
              { toolbarColor: Colors.darkestGray }
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

PrayerRequestsScreen.navigationOptions = {
  headerTitle: () => <Text style={styles.header}>Prayer Requests</Text>,
};

const styles = StyleSheet.create({
  header: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 24,
    color: Colors.white,
  },
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
