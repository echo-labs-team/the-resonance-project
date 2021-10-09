import React, { useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useScrollToTop } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { useBlogPosts } from '../data/blogPosts';
import { useHandleTabChange } from '../utils/useHandleTabChange';
import { Text, Subtitle } from '../components/shared/Typography';
import Button from '../components/shared/Button';
import Spinner from '../components/shared/Spinner';
import EchoLogo from '../components/EchoLogo';
import HomeCardPlaceholder from '../components/HomeCardPlaceholder';
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
  const insets = useSafeArea();
  const ref = React.useRef(null);

  useScrollToTop(ref);

  const [tryAgain, setTryAgain] = useState(false);
  const {
    isLoading: isLoadingBlogPosts,
    isFetching: isFetchingBlogPosts,
    data: postsData = [],
    refetch: refetchBlogPosts,
  } = useBlogPosts();
  const isLoading = isLoadingBlogPosts || isFetchingBlogPosts;

  function handleRefresh() {
    refetchBlogPosts?.();
  }

  const cardData = [...postsData].filter(Boolean).sort(sortPosts);

  if (!isLoading && cardData.length < 1) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.logoContainer}>
          <EchoLogo width={40} height={40} color={Colors.red} />
          <Text XL style={styles.logo}>
            ECHO.CHURCH
          </Text>
        </View>
        <Subtitle center style={styles.error}>
          No posts were found... 🤔
        </Subtitle>
        <Button
          title="Try Again"
          onPress={() => {
            setTryAgain(true);
            handleRefresh();
          }}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        ref={ref}
        refreshControl={
          <RefreshControl
            tintColor={Colors.gray}
            colors={[Colors.gray]}
            refreshing={isFetchingBlogPosts}
            onRefresh={handleRefresh}
          />
        }
        contentContainerStyle={styles.contentContainer}
      >
        {tryAgain && <Spinner />}

        <View style={styles.logoContainer}>
          <EchoLogo width={40} height={40} color={Colors.red} />
          <Text XL style={styles.logo}>
            ECHO.CHURCH
          </Text>
        </View>

        {cardData.map((item, index) =>
          item?.url?.includes('loading') ? (
            <HomeCardPlaceholder key={`placeholder${index}`} />
          ) : (
            <Card key={`card${index}`} {...item} />
          )
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
