// @flow

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  Linking,
} from 'react-native';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import { getInstagramPosts } from '../data/instagram';
import { getBlogPosts } from '../data/blogPosts';
import TextStyles from '../constants/TextStyles';
import Text from '../components/Text';
import HomeCardPlaceholder from '../components/HomeCardPlaceholder';

type PostType =
  | 'INSTAGRAM'
  | 'BLOG'
  | 'MESSAGE_SERIES'
  | 'EVENTS'
  | 'ANNOUNCEMENTS';

type CardProps = {
  type: PostType,
  url: string,
  image: string,
  title: string,
};

const HomeScreen = () => {
  const [cardData, setCardData] = useState([
    { url: 'loading1' },
    { url: 'loading2' },
    { url: 'loading3' },
    { url: 'loading4' },
    { url: 'loading5' },
    { url: 'loading6' },
    { url: 'loading7' },
    { url: 'loading8' },
  ]);
  const [refreshing, setRefreshing] = useState(false);

  // fetch data on mount
  useEffect(() => {
    const getPosts = async () => {
      const igPosts = await getInstagramPosts();
      const blogPosts = await getBlogPosts();

      setCardData([...igPosts, ...blogPosts]);
      setRefreshing(false);
    };

    if (refreshing) {
      getPosts();
      return;
    }

    getPosts();
  }, [refreshing]);

  const refresh = () => {
    setRefreshing(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={Colors.red}
            colors={[Colors.red]}
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        {...getHeaderInset()}
      >
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/echo_logo.png')}
            style={styles.welcomeImage}
          />
        </View>

        {cardData && (
          <FlatList
            keyExtractor={({ url = '' }) => url.slice(-10)}
            data={cardData}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item = {} }: { item: CardProps }) => {
              const { url = '' } = item;

              if (url.includes('loading')) {
                return <HomeCardPlaceholder />;
              }
              return <Card {...item} />;
            }}
          />
        )}
      </ScrollView>
    </View>
  );
};

HomeScreen.navigationOptions = {
  header: null,
};

function getIcon(type: PostType) {
  if (type === 'INSTAGRAM') {
    return {
      uri:
        'https://www.instagram.com/static/images/ico/apple-touch-icon-76x76-precomposed.png/4272e394f5ad.png',
    };
  }

  return {
    BLOG: require('../assets/icons/Blog.png'),
    MESSAGE_SERIES: require('../assets/icons/Message.png'),
    EVENTS: require('../assets/icons/Events.png'),
    ANNOUNCEMENTS: require('../assets/icons/Announcements.png'),
  }[type];
}

const Card = ({ type, url, image, title }: CardProps) => {
  const icon = getIcon(type);

  return (
    <TouchableHighlight
      underlayColor={Colors.darkBlue}
      style={styles.card}
      onPress={() => Linking.openURL(url)}
    >
      <View>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.cardTypeView}>
          <Image source={icon} style={styles.cardTypeIcon} />
          <Text bold style={styles.cardTypeText}>
            {type}
          </Text>
        </View>
        {title && (
          <Text style={[TextStyles.body, styles.title]} numberOfLines={3}>
            {title}
          </Text>
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.headerBackground,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    marginTop: -20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  welcomeImage: {
    width: 250,
    resizeMode: 'contain',
  },
  card: {
    flex: 1,
    backgroundColor: Colors.darkestGray,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: undefined,
    height: 200,
    resizeMode: 'cover',
  },
  cardTypeIcon: {
    width: 16,
    height: 16,
  },
  title: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  cardTypeText: {
    fontSize: 13,
    paddingLeft: 8,
    color: Colors.white,
  },
  cardTypeView: {
    paddingTop: 16,
    paddingLeft: 8,
    paddingRight: 16,
    flexDirection: 'row',
  },
  separator: {
    height: 16,
  },
});

export default HomeScreen;
