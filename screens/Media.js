import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useScrollToTop } from '@react-navigation/native';
import { useQuery } from 'react-query';
import axios from 'redaxios';
import ContentLoader, { Rect } from 'react-content-loader/native';
import logEvent from '../utils/logEvent';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';
import { useHandleTabChange } from '../utils/useHandleTabChange';
import isTheWeekend from '../utils/isTheWeekend';
import { Text, Subtitle } from '../components/shared/Typography';
import Button from '../components/shared/Button';
import LiveCard from '../components/LiveCard';

const screenWidth = Dimensions.get('window').width;

const CurrentSeries = () => {
  const { isLoading: isLoadingCurrentSeries, data: currentSeries } = useQuery(
    'current-series',
    async () => {
      // this is the Current Series page
      const wordpressPage = await axios.get('https://echo.church/teaching');

      // the page then redirects to the actual series page, then we can grab the slug
      const currentSeriesSlug = (
        /echo.church\/(.+)/.exec(wordpressPage.url)?.[1] || ''
      ).replace('/', '');

      const { data: currentSeriesData } = await axios(
        `https://echo.church/wp-json/wp/v2/pages?slug=${currentSeriesSlug}&timestamp=${new Date().getTime()}`,
        { headers: { 'Cache-Control': 'no-cache' } }
      );

      const series = currentSeriesData?.[0] || {};

      // ! make sure the Featured Image is set under Elementor General Settings https://echo.church/wp-admin/
      const getSeriesImageUrl =
        series?._links?.['wp:featuredmedia']?.[0]?.href || '';

      if (!getSeriesImageUrl) {
        return {
          image: null,
          link: 'https://echo.church/teaching',
          title: series?.title?.rendered || 'Current Series',
        };
      }

      // get the attachments, which includes the banner image
      const { data: attachmentData } = await axios(
        `${getSeriesImageUrl}?timestamp=${new Date().getTime()}`,
        { headers: { 'Cache-Control': 'no-cache' } }
      );

      const seriesImage =
        attachmentData?.media_details.sizes.medium_large.source_url ||
        undefined;

      return {
        image: seriesImage,
        link: 'https://echo.church/teaching',
        title: series.title.rendered,
      };
    }
  );

  if (isLoadingCurrentSeries) {
    return (
      <>
        <Subtitle>CURRENT SERIES</Subtitle>
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
      </>
    );
  }

  if (currentSeries) {
    const openCurrentSeries = () => {
      WebBrowser.openBrowserAsync(currentSeries.link, {
        toolbarColor: Colors.darkestGray,
      }).catch((err) => {
        logEvent('ERROR with WebBrowser', { error: err });
        WebBrowser.dismissBrowser();
      });
    };

    return (
      <>
        <Subtitle>CURRENT SERIES</Subtitle>
        <TouchableOpacity onPress={openCurrentSeries}>
          <View>
            {currentSeries.image ? (
              <Image
                source={{ uri: currentSeries.image }}
                style={{
                  width: '100%',
                  height: 200,
                  resizeMode: 'cover',
                  borderRadius: 8,
                }}
              />
            ) : null}
            {currentSeries.title ? (
              <Button
                onPress={openCurrentSeries}
                style={{
                  marginBottom: 8,
                  ButtonAlign: 'center',
                  backgroundColor: 'transparent',
                }}
                title={currentSeries.title}
              />
            ) : null}
          </View>
        </TouchableOpacity>
      </>
    );
  }

  return null;
};

const MediaScreen = () => {
  useHandleTabChange('Media');
  const insets = useSafeArea();
  const ref = React.useRef(null);

  useScrollToTop(ref);

  return (
    <ScrollView
      ref={ref}
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text XXL bold style={styles.headerTitle}>
        MEDIA
      </Text>

      {isTheWeekend && (
        <>
          <TouchableHighlight
            onPress={() => {
              logEvent('TAP Watch Live');
              WebBrowser.openBrowserAsync('https://echo.church/online/', {
                toolbarColor: Colors.darkestGray,
              }).catch((err) => {
                logEvent('ERROR with WebBrowser', { error: err });
                WebBrowser.dismissBrowser();
              });
            }}
          >
            <LiveCard style={styles.largeCard} />
          </TouchableHighlight>
        </>
      )}

      <CurrentSeries />

      <Button
        icon={
          <MaterialCommunityIcons
            name={'youtube'}
            size={24}
            color={Colors.white}
          />
        }
        title="YouTube"
        style={[styles.button, { backgroundColor: Colors.red }]}
        onPress={() => {
          logEvent('TAP YouTube');
          Linking.openURL('https://m.youtube.com/@EchoChurch/featured');
        }}
      />
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
          <MaterialIcons name={'video-library'} size={24} color={Colors.gray} />
        }
        title="Past Series"
        style={styles.button}
        onPress={() => {
          logEvent('TAP Past Series');
          WebBrowser.openBrowserAsync('https://www.echo.church/pastseries/', {
            toolbarColor: Colors.darkestGray,
          }).catch((err) => {
            logEvent('ERROR with WebBrowser', { error: err });
            WebBrowser.dismissBrowser();
          });
        }}
      />

      <TouchableHighlight
        style={{ marginTop: 16, marginBottom: insets.bottom + 48 }}
        onPress={() => {
          logEvent('TAP Rightnow Media');
          Linking.openURL(
            'https://www.rightnowmedia.org/Account/Invite/EchoChurch'
          );
        }}
      >
        <Image
          source={require('../assets/images/rightnow_media.jpg')}
          style={[styles.thumbnailImage, { height: screenWidth / 2 }]}
          resizeMode="cover"
        />
      </TouchableHighlight>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.headerBackground,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  headerTitle: {
    marginVertical: 10,
    color: Colors.red,
  },
  largeCard: {
    borderRadius: 8,
  },
  button: {
    marginVertical: 16,
  },
  thumbnailImage: {
    width: '100%',
    flex: 1,
    borderRadius: 8,
  },
});

export default MediaScreen;
