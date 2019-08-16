import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import Text from '../components/Text';
import Button from '../components/Button';

const PrayerRequestsScreen = () => {
  return (
    <ScrollView style={styles.mainContainer} {...getHeaderInset()}>
      <Image
        source={require('../assets/images/pray.jpg')}
        style={styles.image}
      />
      <View style={styles.container}>
        <Text style={styles.heading}>How can we pray for you?</Text>
        <Text style={styles.content}>
          Let us pray for you. We invite you to contact us during difficult
          times.
        </Text>

        <Button
          title="Submit Your Prayer Request"
          style={styles.button}
          onPress={() => WebBrowser.openBrowserAsync('https://echo.church')}
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
    marginTop: 10,
    marginBottom: 20,
    fontSize: 30,
    color: Colors.white,
  },
  content: {
    marginBottom: 20,
    fontSize: 16,
    color: Colors.gray,
  },
  button: { marginVertical: 10 },
});

export default PrayerRequestsScreen;
