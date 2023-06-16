import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useScrollToTop } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { useBlogPosts } from '../data/blogPosts';
import { useHandleTabChange } from '../utils/useHandleTabChange';
import { Text } from '../components/shared/Typography';
import Button from '../components/shared/Button';
import EchoLogo from '../components/EchoLogo';
import HomeCardPlaceholder from '../components/HomeCardPlaceholder';
import Card from '../components/HomeCard';
import { openBrowser } from '../utils/openBrowser';
import { Feather } from '@expo/vector-icons';

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

const CheckInButton = () => (
  <Button
    icon={<Feather name="check-square" size={28} color={Colors.white} />}
    title="Check In"
    style={styles.checkIn}
    onPress={() =>
      openBrowser({
        title: 'Check In',
        url: 'https://my.echo.church/check-in',
      })
    }
  />
);

const HomeScreen = () => {
  useHandleTabChange('Home');
  const insets = useSafeArea();
  const ref = React.useRef(null);

  useScrollToTop(ref);

  const {
    isLoading: isLoadingBlogPosts,
    isFetching: isFetchingBlogPosts,
    data: postsData = [],
    refetch: refetchBlogPosts,
  } = useBlogPosts();
  const isLoading = isLoadingBlogPosts;

  function handleRefresh() {
    refetchBlogPosts?.();
  }

  const cardData = [...postsData].filter(Boolean).sort(sortPosts);

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <ScrollView ref={ref} contentContainerStyle={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <EchoLogo width={40} height={40} color={Colors.red} />
            <Text XL style={styles.logo}>
              ECHO.CHURCH
            </Text>
          </View>
          {Array.from({ length: 5 }).map((_, index) => (
            <HomeCardPlaceholder key={`placeholder${index}`} />
          ))}
        </ScrollView>
        <CheckInButton />
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
        <View style={styles.logoContainer}>
          <EchoLogo width={40} height={40} color={Colors.red} />
          <Text XL style={styles.logo}>
            ECHO.CHURCH
          </Text>
        </View>

        {cardData.map((item, index) => (
          <Card key={`card${index}`} {...item} />
        ))}
      </ScrollView>
      <CheckInButton />
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
  checkIn: {
    backgroundColor: Colors.red,
  },
});

export default HomeScreen;
