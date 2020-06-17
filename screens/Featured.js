import React, { useEffect } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';
import * as Amplitude from 'expo-analytics-amplitude';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { listItems } from '../config/featured';
import { Text } from '../components/shared/Typography';
import Button from '../components/shared/Button';

function FeaturedScreen({ navigation }) {
  useEffect(() => {
    StatusBar.setHidden(false);
  }, []);
  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
        <View style={[styles.mainContainer, { paddingTop: headerHeight }]}>
          <ImageBackground
            source={require('../assets/images/hp-bg.jpg')}
            style={styles.backgroundImage}
          />
          <Image
            source={require('../assets/images/hp-logo.png')}
            style={styles.logo}
          />
          <FlatList
            keyExtractor={({ value }) => value}
            data={listItems}
            ItemSeparatorComponent={({ highlighted }) => (
              <View
                style={[styles.separator, highlighted && { marginLeft: 0 }]}
              />
            )}
            renderItem={({ item = {} }) => (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => {
                  Amplitude.logEvent(`OPEN ${item.value}`);
                  navigation.navigate('FeaturedDetails', item);
                }}
              >
                <View style={styles.item}>
                  <Text L bold style={styles.text}>
                    {item.value}
                  </Text>
                  <Feather
                    name={'chevron-right'}
                    size={30}
                    color={Colors.white}
                  />
                </View>
              </TouchableHighlight>
            )}
            style={styles.list}
          />
          <Button
            title="Join the Hope Project"
            style={styles.button}
            onPress={() => {
              WebBrowser.openBrowserAsync('https://echo.church/hopeproject/', {
                toolbarColor: Colors.darkestGray,
              }).catch((err) => {
                Amplitude.logEventWithProperties('ERROR with WebBrowser', {
                  error: err,
                });
                WebBrowser.dismissBrowser();
              });
            }}
          />
        </View>
      )}
    </HeaderHeightContext.Consumer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.darkestGray,
  },
  backgroundImage: {
    width: '100%',
    height: Layout.window.height,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.5,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 6,
    alignSelf: 'center',
  },
  list: {
    paddingTop: 4,
    paddingBottom: 20,
  },
  separator: {
    height: 0.5,
    marginLeft: 20,
    backgroundColor: Colors.blue,
  },
  item: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    paddingVertical: 10,
    paddingLeft: 8,
    color: Colors.white,
  },
  button: { marginVertical: 10, marginHorizontal: 10 },
});

export default FeaturedScreen;
