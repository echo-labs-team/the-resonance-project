import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useScrollToTop } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import {
  Image,
  ImageURISource,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import EchoLogo from '../components/EchoLogo';
import Card from '../components/HomeCard';
import HomeCardPlaceholder from '../components/HomeCardPlaceholder';
import Button from '../components/shared/Button';
import { Text } from '../components/shared/Typography';
import Colors, { Color } from '../constants/Colors';
import { useBlogPosts } from '../queries/blogPosts';
import { useCurrentSeries } from '../queries/useCurrentSeries';
import logEvent from '../utils/logEvent';
import { openBrowser } from '../utils/openBrowser';
import { useHandleTabChange } from '../utils/useHandleTabChange';

function CheckInButton() {
  return (
    <Button
      icon={<Feather color={Colors.white} name="check-square" size={28} />}
      onPress={() => {
        openBrowser({
          title: 'Check In',
          url: 'https://my.echo.church/check-in',
        });
      }}
      style={styles.checkIn}
      title="Check In"
    />
  );
}

function CurrentSeries() {
  const { currentSeries, isLoadingCurrentSeries, openCurrentSeries } =
    useCurrentSeries();

  if (isLoadingCurrentSeries) {
    return (
      <View>
        <ContentLoader
          backgroundColor={Colors.darkGray}
          foregroundColor={Colors.darkerGray}
          preserveAspectRatio="none"
          style={{
            backgroundColor: Colors.darkestGray,
            borderRadius: 8,
            height: 200,
            marginBottom: 8,
            overflow: 'hidden',
          }}
          viewBox="0 0 300 200"
        >
          <Rect height="200" rx="0" ry="0" width="100%" x="0" y="0" />
        </ContentLoader>
      </View>
    );
  }

  if (currentSeries) {
    return (
      <TouchableOpacity
        onPress={openCurrentSeries}
        style={{
          borderRadius: 8,
        }}
      >
        <View>
          <Image
            accessibilityLabel={`Current Series - ${currentSeries.title}}`}
            source={{ uri: currentSeries.image } as ImageURISource}
            style={{
              borderRadius: 8,
              height: 200,
              resizeMode: 'cover',
              width: '100%',
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return null;
}

function HomeScreen() {
  useHandleTabChange('Home');
  const insets = useSafeArea();
  const ref = React.useRef(null);
  useScrollToTop(ref);

  const { data: postsData = [], isLoadingBlogPosts } = useBlogPosts();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.contentContainer} ref={ref}>
        <View style={styles.logoContainer}>
          <EchoLogo color={Colors.red as Color} height={40} width={40} />
          <Text XL style={styles.logo}>
            ECHO.CHURCH
          </Text>
        </View>

        <View style={styles.main}>
          <CurrentSeries />
          <Button
            icon={
              <MaterialIcons
                color={Colors.white}
                name="speaker-notes"
                size={24}
              />
            }
            onPress={() => {
              logEvent('TAP Message Notes');
              Linking.openURL('https://echo.church/messagenotes').catch(
                (err: unknown) => {
                  logEvent('ERROR with Linking', { error: err });
                }
              );
            }}
            style={{ backgroundColor: Colors.darkBlue }}
            title="Message Notes"
          />
          <Button
            icon={
              <MaterialIcons
                color={Colors.gray}
                name="video-library"
                size={24}
              />
            }
            onPress={() => {
              logEvent('TAP Past Series');
              WebBrowser.openBrowserAsync(
                'https://www.echo.church/pastseries/',
                {
                  toolbarColor: Colors.darkestGray,
                }
              ).catch((err: unknown) => {
                logEvent('ERROR with WebBrowser', { error: err });
                WebBrowser.dismissBrowser();
              });
            }}
            title="Past Series"
          />
        </View>

        {isLoadingBlogPosts
          ? Array.from({ length: 5 }).map((_, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <HomeCardPlaceholder key={`placeholder${index}`} />
            ))
          : postsData.map((item) => {
              if (!item) return null;

              const blogPost = item as {
                date: string;
                image: string;
                title: string;
                type: 'BLOG';
                url: string;
              };

              return (
                <Card
                  date={blogPost.date}
                  image={blogPost.image}
                  key={blogPost.url}
                  title={blogPost.title}
                  type={blogPost.type}
                  url={blogPost.url}
                />
              );
            })}
      </ScrollView>
      <CheckInButton />
    </View>
  );
}

const styles = StyleSheet.create({
  checkIn: {
    backgroundColor: Colors.red,
  },
  container: {
    backgroundColor: Colors.headerBackground,
    flex: 1,
  },
  contentContainer: {
    marginTop: 0,
    paddingHorizontal: 10,
  },
  logo: {
    color: Colors.white,
    marginLeft: 10,
  },
  logoContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  main: {
    gap: 20,
    marginBottom: 40,
  },
});

export default HomeScreen;
