import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import { setStatusBarHidden } from 'expo-status-bar';
import { HeaderHeightContext } from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';
import logEvent from '../utils/logEvent';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Text } from '../components/shared/Typography';
import Button from '../components/shared/Button';

function FeaturedScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setStatusBarHidden(false, 'fade');

    // set the post data for the list up to today's date
    const items = [];
    const start = new Date('June 15, 2020');
    const today = new Date();
    const timeDiff =
      today.getTime() - new Date('June 14, 2020 12:00:00').getTime();
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

    setPosts(items.reverse());
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
            ItemSeparatorComponent={() => <View style={[styles.separator]} />}
            renderItem={({ item = {} }) => (
              <TouchableHighlight
                style={styles.item}
                underlayColor={Colors.blue}
                onPress={() => {
                  logEvent(`OPEN ${item.value}`);
                  WebBrowser.openBrowserAsync(
                    `https://echo.church/${item.slug}`,
                    {
                      toolbarColor: Colors.darkestGray,
                    }
                  ).catch((err) => {
                    logEvent('ERROR with WebBrowser', { error: err });
                    WebBrowser.dismissBrowser();
                  });
                }}
              >
                <View>
                  <Text L bold style={styles.text}>
                    {item.value}
                  </Text>
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
                logEvent('ERROR with WebBrowser', { error: err });
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
    marginTop: 10,
    alignSelf: 'center',
  },
  list: {
    marginTop: 10,
  },
  separator: {
    height: 20,
  },
  item: {
    marginHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: Colors.darkGray,
  },
  text: {
    paddingVertical: 10,
    paddingLeft: 8,
    color: Colors.white,
  },
  button: {
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default FeaturedScreen;
