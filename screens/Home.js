import React from 'react';
import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useScrollToTop } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { useBlogPosts } from '../queries/blogPosts';
import { useHandleTabChange } from '../utils/useHandleTabChange';
import { Text } from '../components/shared/Typography';
import Button from '../components/shared/Button';
import EchoLogo from '../components/EchoLogo';
import HomeCardPlaceholder from '../components/HomeCardPlaceholder';
import Card from '../components/HomeCard';
import { openBrowser } from '../utils/openBrowser';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useCurrentSeries } from '../queries/useCurrentSeries';
import ContentLoader, { Rect } from 'react-content-loader/native';
import * as WebBrowser from 'expo-web-browser';
import logEvent from '../utils/logEvent';

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

const CurrentSeries = () => {
  const { isLoadingCurrentSeries, currentSeries, openCurrentSeries } =
    useCurrentSeries();

  if (isLoadingCurrentSeries) {
    return (
      <View>
        <ContentLoader
          viewBox="0 0 300 200"
          backgroundColor={Colors.darkGray}
          foregroundColor={Colors.darkerGray}
          preserveAspectRatio="none"
          style={{
            height: 200,
            marginBottom: 8,
            borderRadius: 8,
            backgroundColor: Colors.darkestGray,
            overflow: 'hidden',
          }}
        >
          <Rect x="0" y="0" rx="0" ry="0" width="100%" height="200" />
        </ContentLoader>
      </View>
    );
  }

  if (currentSeries.image) {
    return (
      <TouchableOpacity
        style={styles.currentSeries}
        onPress={openCurrentSeries}
      >
        <View>
          <Image
            accessibilityLabel={`Current Series - ${currentSeries.title}}`}
            source={{ uri: currentSeries.image }}
            style={{
              width: '100%',
              height: 200,
              resizeMode: 'cover',
              borderRadius: 8,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return null;
};

const HomeScreen = () => {
  useHandleTabChange('Home');
  const insets = useSafeArea();
  const ref = React.useRef(null);

  useScrollToTop(ref);

  const {
    isLoadingBlogPosts,
    isFetching: isFetchingBlogPosts,
    data: postsData = [],
    refetch: refetchBlogPosts,
  } = useBlogPosts();

  function handleRefresh() {
    refetchBlogPosts?.();
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

        <View style={styles.main}>
          <CurrentSeries />
          <Button
            icon={
              <MaterialIcons
                name={'speaker-notes'}
                size={24}
                color={Colors.white}
              />
            }
            title="Message Notes"
            style={[styles.button, { backgroundColor: Colors.darkBlue }]}
            onPress={() => {
              logEvent('TAP Message Notes');
              Linking.openURL('https://echo.church/messagenotes');
            }}
          />
          <Button
            icon={
              <MaterialIcons
                name={'video-library'}
                size={24}
                color={Colors.gray}
              />
            }
            title="Past Series"
            style={styles.button}
            onPress={() => {
              logEvent('TAP Past Series');
              WebBrowser.openBrowserAsync(
                'https://www.echo.church/pastseries/',
                {
                  toolbarColor: Colors.darkestGray,
                }
              ).catch((err) => {
                logEvent('ERROR with WebBrowser', { error: err });
                WebBrowser.dismissBrowser();
              });
            }}
          />
        </View>

        {isLoadingBlogPosts
          ? Array.from({ length: 5 }).map((_, index) => (
              <HomeCardPlaceholder key={`placeholder${index}`} />
            ))
          : postsData.map((item, index) => (
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
  main: {
    marginBottom: 40,
    gap: 20,
  },
});

export default HomeScreen;
