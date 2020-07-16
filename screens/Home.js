import React, { useState, useEffect } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useAsyncStorage } from '@react-native-community/async-storage';
import { useSafeArea } from 'react-native-safe-area-context';
import { useScrollToTop } from '@react-navigation/native';
import logEvent from '../utils/logEvent';
import Colors from '../constants/Colors';
import { getInstagramPosts } from '../data/instagram';
import { getBlogPosts } from '../data/blogPosts';
import { getVerseOfTheDay } from '../data/verseOfTheDay';
import useHandleTabChange from '../utils/useHandleTabChange';
import AnimateChildrenIn from '../components/AnimateChildrenIn';
import { Text, Subtitle } from '../components/shared/Typography';
import Button from '../components/shared/Button';
import Spinner from '../components/shared/Spinner';
import EchoLogo from '../components/EchoLogo';
import HomeCardPlaceholder from '../components/HomeCardPlaceholder';
import FeaturedCard from '../components/FeaturedCard';
import Card from '../components/HomeCard';

const sortPosts = (firstPost = {}, secondPost = {}) => {
  const { date: firstDate, type: firstType } = firstPost;
  const { date: secondDate, type: secondType } = secondPost;

  if (firstDate === secondDate) {
    if (firstType === 'BLOG') {
      return -1;
    }
    if (secondType === 'BLOG') {
      return 1;
    }
  }

  return new Date(secondDate) - new Date(firstDate);
};

const HomeScreen = () => {
  useHandleTabChange('Home');
  const { removeItem } = useAsyncStorage('@posts');
  const insets = useSafeArea();
  const ref = React.useRef(null);

  useScrollToTop(ref);

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

  useEffect(async () => {
    await removeItem().catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const igPosts = (await getInstagramPosts()) || [];
      const blogPosts = (await getBlogPosts()) || [];
      const verseOfTheDay = (await getVerseOfTheDay()) || {};

      if (!blogPosts.length || !igPosts.length) {
        logEvent('ERROR no posts');
      }

      // get all the posts and sort them descending by date
      const posts = [...blogPosts, ...igPosts].sort(sortPosts);

      // insert VOTD post
      posts.splice(5, 0, verseOfTheDay);

      setCardData(posts);
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
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        ref={ref}
        refreshControl={
          <RefreshControl
            tintColor={Colors.gray}
            colors={[Colors.gray]}
            refreshing={refreshing}
            onRefresh={refresh}
          />
        }
        contentContainerStyle={styles.contentContainer}
      >
        {tryAgain && <Spinner />}

        <AnimateChildrenIn
          type="slide-top"
          durationMs={500}
          delayMs={300}
          style={styles.logoContainer}
        >
          <EchoLogo width={40} height={40} color={Colors.red} />
          <Text XL style={styles.logo}>
            ECHO.CHURCH
          </Text>
        </AnimateChildrenIn>

        <FeaturedCard />

        {cardData.length ? (
          cardData.map((item, index) =>
            item?.url?.includes('loading') ? (
              <HomeCardPlaceholder key={`placeholder${index}`} />
            ) : (
              <Card key={`card${index}`} {...item} />
            )
          )
        ) : (
          <>
            <Subtitle center style={styles.error}>
              No posts were found... 🤔
            </Subtitle>
            <Button title="Try Again" onPress={() => setTryAgain(true)} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.headerBackground,
  },
  contentContainer: {
    paddingHorizontal: 10,
    marginTop: 0,
  },
  logoContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  logo: {
    marginLeft: 10,
    color: Colors.white,
  },
  error: { marginBottom: 10 },
});

export default HomeScreen;
