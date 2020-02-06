// @flow

import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as Amplitude from 'expo-analytics-amplitude';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import AnimateChildrenIn from '../components/AnimateChildrenIn';
import Text from '../components/Text';
import Button from '../components/Button';

const items = [
  { value: 'LOCATIONS', page: 'Locations' },
  { value: 'ACTIVATE', page: 'Activate' },
  { value: 'BAPTISM', page: 'Baptism' },
  { value: 'VOLUNTEER', page: 'Volunteer' },
  { value: 'PRAYER REQUESTS', page: 'PrayerRequests' },
  { value: 'MISSIONS', page: 'Missions' },
];

function openConnectionCard() {
  Amplitude.logEventWithProperties('mobileEngagementAction', {
    app: 'mobile',
    connect: 'connection card',
  });

  WebBrowser.openBrowserAsync('https://echo.church/connectioncard', {
    toolbarColor: Colors.darkestGray,
  });
}

const ConnectScreen = ({ navigation }: { navigation: Object }) => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../assets/images/connect_bg.png')}
        style={styles.backgroundImage}
      />
      <ScrollView style={{ flex: 1 }} {...getHeaderInset()}>
        <AnimateChildrenIn delayMs={300} durationMs={750}>
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
                  Amplitude.logEventWithProperties('mobilePageView', {
                    app: 'mobile',
                    connect: page,
                  });
                  navigation.navigate(page);
                }}
              >
                <View style={styles.item}>
                  <Text style={styles.text}>{value}</Text>
                  <Feather
                    name={'chevron-right'}
                    size={26}
                    color={Colors.white}
                  />
                </View>
              </TouchableHighlight>
            )}
            style={styles.list}
          />
        </AnimateChildrenIn>
      </ScrollView>

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
    marginLeft: 16,
    fontSize: 30,
    color: Colors.red,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
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
