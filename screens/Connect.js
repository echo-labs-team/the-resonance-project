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
import { Feather } from '@expo/vector-icons';
import * as Amplitude from 'expo-analytics-amplitude';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import Text from '../components/Text';

const items = [
  { value: 'ACTIVATE', page: 'Activate' },
  { value: 'BAPTISM', page: 'Baptism' },
  { value: 'VOLUNTEER', page: 'Volunteer' },
  { value: 'PRAYER REQUESTS', page: 'PrayerRequests' },
  { value: 'MISSIONS', page: 'Missions' },
];

const EngageScreen = ({ navigation }: { navigation: Object }) => {
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../assets/images/connect_bg.png')}
        style={styles.backgroundImage}
      />
      <ScrollView style={{ flex: 1 }} {...getHeaderInset()}>
        <Text bold style={styles.headerTitle}>
          CONNECT
        </Text>
        <FlatList
          keyExtractor={({ value }) => value}
          data={items}
          renderItem={({ item: { value, page } = {} }) => (
            <TouchableHighlight
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
      </ScrollView>
    </View>
  );
};

EngageScreen.navigationOptions = {
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
    paddingTop: 20,
    paddingHorizontal: 10,
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
});

export default EngageScreen;
