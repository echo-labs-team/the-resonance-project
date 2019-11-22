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
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import EchoLogo from '../components/EchoLogo';
import ServiceTimes from '../components/ServiceTimes';
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
  const [tryAgain, setTryAgain] = useState(false);

  // fetch data on mount
  useEffect(() => {
    const getPosts = async () => {
      const igPosts = (await getInstagramPosts()) || [];
      const blogPosts = (await getBlogPosts()) || [];

      setCardData([...igPosts, ...blogPosts]);
      setRefreshing(false);
      setTryAgain(false);
    };

    if (refreshing || tryAgain) {
      getPosts();
      return;
    }

    getPosts();
  }, [refreshing, tryAgain]);

  const refresh = () => {
    setRefreshing(true);
  };

  return (
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
      {tryAgain && <Spinner />}

      <View style={styles.logoContainer}>
        <EchoLogo width={40} height={40} color={Colors.red} />
        <Text style={{ marginLeft: 10, fontSize: 26, color: Colors.white }}>
          ECHO.CHURCH
        </Text>
      </View>

      {cardData.length ? (
        <FlatList
          keyExtractor={({ url = '' }) => url.slice(-10)}
          data={cardData}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({
            item = {},
            index,
          }: {
            item: CardProps,
            index: number,
          }) => {
            const { url = '' } = item;

            if (url.includes('loading')) {
              return <HomeCardPlaceholder />;
            }
            return [
              <Card key={`card${index}`} {...item} />,
              index === 0 ? <ServiceTimes key="serviceTimes" /> : null,
            ];
          }}
        />
      ) : (
        <>
          <ServiceTimes />
          <Text style={styles.error}>No posts were found... 🤔</Text>
          <Button title="Try Again" onPress={() => setTryAgain(true)} />
        </>
      )}
    </ScrollView>
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
  logoContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  error: {
    marginBottom: 10,
    fontSize: 20,
    textAlign: 'center',
    color: Colors.gray,
  },
});

export default HomeScreen;
