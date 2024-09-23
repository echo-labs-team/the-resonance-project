import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import logEvent from '../utils/logEvent';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { Text } from './shared/Typography';

function getIcon(type) {
  if (type === 'INSTAGRAM') {
    return {
      uri: 'https://www.instagram.com/static/images/ico/apple-touch-icon-76x76-precomposed.png/4272e394f5ad.png',
    };
  }

  return {
    BLOG: {
      expoIcon: (
        <MaterialCommunityIcons color={Colors.white} name="post" size={24} />
      ),
    },
    INSTAGRAM: {
      expoIcon: (
        <MaterialCommunityIcons
          color={Colors.white}
          name="instagram"
          size={24}
        />
      ),
    },
    SOCIAL: {
      expoIcon: (
        <MaterialCommunityIcons color={Colors.white} name="twitter" size={24} />
      ),
    },
    'VERSE OF THE DAY': {
      expoIcon: <FontAwesome5 color={Colors.white} name="bible" size={24} />,
    },
  }[type];
}

function getImageHeight(type, image) {
  // if we don't have an image, let's not take up space for it
  if (!image) {
    return 0;
  }

  // these images are pretty large
  if (type === 'SOCIAL' || type === 'VERSE OF THE DAY') {
    return Layout.window.width - 20;
  }

  return 200;
}

function Card({ date, image, title, type, url }) {
  if (!type) {
    return null;
  }

  const icon = getIcon(type);

  return (
    <TouchableHighlight
      onPress={() => {
        logEvent('TAP post', {
          post_type: type?.toLowerCase(),
        });

        if (url) {
          if (type === 'BLOG') {
            return WebBrowser.openBrowserAsync(url, {
              toolbarColor: Colors.darkestGray,
            }).catch((err) => {
              logEvent('ERROR with WebBrowser', { error: err });
              WebBrowser.dismissBrowser();
            });
          }

          Linking.openURL(url);
        }
      }}
      style={styles.card}
      underlayColor={Colors.darkBlue}
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
            {type === 'SOCIAL' ? null : (
              <Text bold style={styles.cardTypeText}>
                {type}
              </Text>
            )}
          </View>
          {date ? (
            <Text light style={styles.cardTypeText}>
              {date}
            </Text>
          ) : null}
        </View>
        {title ? (
          <Text
            numberOfLines={type === 'SOCIAL' ? undefined : 3}
            style={styles.title}
          >
            {title}
          </Text>
        ) : null}
      </View>
    </TouchableHighlight>
  );
}

export const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.darkestGray,
    borderRadius: 8,
    flex: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardType: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardTypeIcon: {
    height: 16,
    width: 16,
  },
  cardTypeText: {
    paddingLeft: 8,
  },
  cardTypeView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  image: {
    marginBottom: 8,
    resizeMode: 'cover',
    width: undefined,
  },
  title: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
});

export default Card;
