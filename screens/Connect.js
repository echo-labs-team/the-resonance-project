import React from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import logEvent from '../utils/logEvent';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import useHandleTabChange from '../utils/useHandleTabChange';
import { listItems, callToActionButtons } from '../config/connect';
import { Text } from '../components/shared/Typography';
import Button from '../components/shared/Button';

const numberOfCTAs = callToActionButtons.length;

function openBrowser({ title, url }) {
  logEvent(`TAP ${title}`);
  WebBrowser.openBrowserAsync(url, {
    toolbarColor: Colors.darkestGray,
  }).catch((err) => {
    logEvent('ERROR with WebBrowser', { error: err.message });
    WebBrowser.dismissBrowser();
  });
}

const ConnectScreen = ({ navigation }) => {
  useHandleTabChange('Connect');
  const insets = useSafeArea();

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <ImageBackground
        source={require('../assets/images/connect_bg.png')}
        style={styles.backgroundImage}
      />

      <Text XXL bold style={styles.headerTitle}>
        CONNECT
      </Text>

      <FlatList
        keyExtractor={({ value }) => value}
        data={listItems}
        renderItem={({ item: { value, page } = {} }) => (
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => {
              logEvent(`OPEN ${page}`);
              navigation.navigate(page);
            }}
          >
            <View style={styles.item}>
              <Text XL style={styles.text}>
                {value}
              </Text>
              <Feather
                name={'chevron-right'}
                size={30}
                color={Colors.lightGray}
              />
            </View>
          </TouchableHighlight>
        )}
        style={styles.list}
      />

      <View>
        {/* 
          only allow the ScrollView around the CTAs to
          scroll if there's more than 2 extra ones 
        */}
        <ScrollView
          scrollEnabled={numberOfCTAs > 2}
          style={styles.callToActions}
        >
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
            onPress={() =>
              openBrowser({
                title: 'Connection Card',
                url: 'https://echo.church/connectioncard',
              })
            }
          />
          {numberOfCTAs &&
            callToActionButtons.map(({ title, url, backgroundColor }) => (
              <Button
                key={title}
                title={title}
                style={[styles.connectionCard, { backgroundColor }]}
                onPress={() => openBrowser({ title, url })}
              />
            ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  headerTitle: {
    marginVertical: 10,
    marginLeft: 16,
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
  },
  connectionCard: { margin: 10 },
  callToActions: { maxHeight: 360 },
});

export default ConnectScreen;
