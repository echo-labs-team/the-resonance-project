// @flow

import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Amplitude from 'expo-analytics-amplitude';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import Text from '../components/shared/Text';
import Button from '../components/shared/Button';

const items = [
  { value: 'LOCATIONS', page: 'Locations' },
  { value: 'ACTIVATE', page: 'Activate' },
  { value: 'BAPTISM', page: 'Baptism' },
  { value: 'VOLUNTEER', page: 'Volunteer' },
  { value: 'PRAYER REQUESTS', page: 'PrayerRequests' },
  { value: 'MISSIONS', page: 'Missions' },
];

function openConnectionCard() {
  Amplitude.logEvent('TAP Connection Card');
  WebBrowser.openBrowserAsync('https://echo.church/connectioncard', {
    toolbarColor: Colors.darkestGray,
  }).catch(err => {
    Amplitude.logEventWithProperties('ERROR with WebBrowser', {
      error: err,
    });
    WebBrowser.dismissBrowser();
  });
}

const ConnectScreen = ({ navigation }: { navigation: Object }) => {
  const insets = useSafeArea();

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <ImageBackground
        source={require('../assets/images/connect_bg.png')}
        style={styles.backgroundImage}
      />

      <Text bold style={styles.headerTitle}>
        CONNECT
      </Text>
      <FlatList
        keyExtractor={({ value }) => value}
        data={items}
        renderItem={({ item: { value, page } = {} }) => (
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              Amplitude.logEvent(`OPEN ${page}`);
              navigation.navigate(page);
            }}
          >
            <View style={styles.item}>
              <Text style={styles.text}>{value}</Text>
              <Feather name={'chevron-right'} size={26} color={Colors.white} />
            </View>
          </TouchableHighlight>
        )}
        style={styles.list}
      />

      <Button
        icon={
          <MaterialCommunityIcons
            name={'account-heart'}
            size={28}
            color={Colors.gray}
          />
        }
        title="Connection Card"
        style={styles.connectionCard}
        onPress={openConnectionCard}
      />
    </View>
  );
};

ConnectScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  headerTitle: {
    marginTop: 10,
    marginLeft: 16,
    fontSize: 30,
    color: Colors.red,
  },
  backgroundImage: {
    width: '100%',
    height: Layout.window.height,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  list: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    paddingVertical: 10,
    paddingLeft: 8,
    fontSize: 26,
    color: Colors.white,
  },
  connectionCard: { marginHorizontal: 10, marginBottom: 20 },
});

export default ConnectScreen;
