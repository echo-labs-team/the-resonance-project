import React, { useState, useEffect } from 'react';
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
import { Text } from '../components/shared/Typography';
import Button from '../components/shared/Button';

function FeaturedScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    StatusBar.setHidden(false);

    // set the post data for the list up to today's date
    const items = [];
    const start = new Date(2020, 5, 15);
    const today = new Date();
    const timeDiff = today.getTime() - start.getTime();
    const dayDiff = Math.round(timeDiff / (1000 * 3600 * 24));

    for (let i = 0; i < dayDiff; i++) {
      const postDate = new Date(start);
      const day = i + 1;

      postDate.setDate(start.getDate() + i);
      items.push({
        value: `DAY ${day} - ${postDate.toLocaleDateString()}`,
        slug: `day${day}-hopeproject`,
      });
    }

    setPosts(items);
  }, []);

  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
        <View style={[styles.mainContainer, { paddingTop: headerHeight }]}>
          <ImageBackground
            progressiveRenderingEnabled
            source={{
              uri:
                'https://echo.church/wp-content/uploads/2020/05/Hope-Project_TitleSlideFinal111.jpg',
            }}
            style={styles.backgroundImage}
          />
          <Image
            progressiveRenderingEnabled
            source={{
              uri:
                'https://echo.church/wp-content/uploads/elementor/thumbs/HP_WhiteIcon-1-opizmnxv1bqwwsj6ih2c78mebgu69hsmb89bs0b45s.png',
            }}
            style={styles.logo}
          />
          <FlatList
            keyExtractor={({ value }) => value}
            data={posts}
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
    backgroundColor: Colors.blue,
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
