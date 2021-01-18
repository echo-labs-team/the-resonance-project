import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { FontAwesome5 } from '@expo/vector-icons';
import logEvent from '../utils/logEvent';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Text } from './shared/Typography';

function getIcon(type) {
  if (type === 'INSTAGRAM') {
    return {
      uri:
        'https://www.instagram.com/static/images/ico/apple-touch-icon-76x76-precomposed.png/4272e394f5ad.png',
    };
  }

  return {
    BLOG: require('../assets/icons/Blog.png'),
    EVENTS: require('../assets/icons/Events.png'),
    ANNOUNCEMENTS: require('../assets/icons/Announcements.png'),
    'VERSE OF THE DAY': {
      expoIcon: <FontAwesome5 name={'bible'} size={24} color={Colors.white} />,
    },
  }[type];
}

function getImageHeight(type, image) {
  // if we don't have an image, let's not take up space for it
  if (!image) {
    return 0;
  }

  // these images are pretty large
  if (type === 'INSTAGRAM' || type === 'VERSE OF THE DAY') {
    return Layout.window.width - 20;
  }

  return 200;
}

function Card({ type, url, image, title, date }) {
  const icon = getIcon(type);

  return (
    <TouchableHighlight
      underlayColor={Colors.darkBlue}
      style={styles.card}
      onPress={() => {
        logEvent('TAP post', {
          post_type: type.toLowerCase(),
        });

        if (type === 'BLOG') {
          return WebBrowser.openBrowserAsync(url, {
            toolbarColor: Colors.darkestGray,
          }).catch((err) => {
            logEvent('ERROR with WebBrowser', { error: err.message });
            WebBrowser.dismissBrowser();
          });
        }
        Linking.openURL(url);
      }}
    >
      <View>
        {image ? (
          <Image
            source={{ uri: image }}
            style={[
              styles.image,
              {
                height: getImageHeight(type, image),
              },
            ]}
          />
        ) : null}
        <View style={styles.cardTypeView}>
          <View style={styles.cardType}>
            {icon?.expoIcon ? (
              icon.expoIcon
            ) : (
              <Image source={icon} style={styles.cardTypeIcon} />
            )}
            <Text bold style={styles.cardTypeText}>
              {type}
            </Text>
          </View>
          {date && (
            <Text light style={styles.cardTypeText}>
              {date}
            </Text>
          )}
        </View>
        {title && (
          <Text style={styles.title} numberOfLines={3}>
            {title}
          </Text>
        )}
      </View>
    </TouchableHighlight>
  );
}

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: 16,
    backgroundColor: Colors.darkestGray,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: undefined,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  title: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  cardTypeView: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTypeIcon: {
    width: 16,
    height: 16,
  },
  cardTypeText: {
    paddingLeft: 8,
  },
});

export default Card;
