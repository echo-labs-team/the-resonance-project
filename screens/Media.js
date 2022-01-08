import React, { useState, useEffect } from 'react';
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
import { useScrollToTop, useNavigation } from '@react-navigation/native';
import { useQuery } from 'react-query';
import axios from 'redaxios';
import ContentLoader, { Rect } from 'react-content-loader/native';
import logEvent from '../utils/logEvent';
import { MaterialIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { fetchChannelSection, fetchPlaylistsWrapper } from '../data/youtube';
import Colors from '../constants/Colors';
import { useHandleTabChange } from '../utils/useHandleTabChange';
import isTheWeekend from '../utils/isTheWeekend';
import { Text, Subtitle, Heading } from '../components/shared/Typography';
import Button from '../components/shared/Button';
import Spinner from '../components/shared/Spinner';
import LiveCard from '../components/LiveCard';

const screenWidth = Dimensions.get('window').width;

const CurrentSeries = () => {
  const { isLoading: isLoadingCurrentSeries, data: currentSeries } = useQuery(
    'current-series',
    async () => {
      // this is the Current Series page
      const wordpressPage = await axios.get('https://echo.church/teaching');

      // the page then redirects to the actual series page, then we can grab the slug
      const currentSeriesSlug = wordpressPage.url
        .replace('https://echo.church/', '')
        .replace('/', '');

      const { data: currentSeriesData } = await axios(
        `https://echo.church/wp-json/wp/v2/pages?slug=${currentSeriesSlug}&timestamp=${new Date().getTime()}`,
        { headers: { 'Cache-Control': 'no-cache' } }
      );

      const [series] = currentSeriesData;

      // ! make sure the Featured Image is set under Elementor General Settings https://echo.church/wp-admin/
      const [{ href: getSeriesImageUrl }] = series._links['wp:featuredmedia'];

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
        <Subtitle style={styles.sectionHeaderText}>CURRENT SERIES</Subtitle>
        <View style={{ marginHorizontal: 16 }}>
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
    return (
      <>
        <Subtitle style={styles.sectionHeaderText}>CURRENT SERIES</Subtitle>
        <TouchableOpacity
          onPress={() => {
            WebBrowser.openBrowserAsync(currentSeries.link, {
              toolbarColor: Colors.darkestGray,
            }).catch((err) => {
              logEvent('ERROR with WebBrowser', { error: err });
              WebBrowser.dismissBrowser();
            });
          }}
          style={{ marginHorizontal: 16 }}
        >
          <View>
            <Image
              source={{ uri: currentSeries.image }}
              style={{
                width: '100%',
                height: 200,
                resizeMode: 'cover',
                borderRadius: 8,
              }}
            />
            <Text style={{ marginVertical: 8, textAlign: 'center' }}>
              {currentSeries.title}
            </Text>
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
  const navigation = useNavigation();
  const ref = React.useRef(null);

  useScrollToTop(ref);

  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [data, setData] = useState([]);

  async function getPlaylists() {
    const channelSection = await fetchChannelSection().catch((err) => {
      setError(true);
      logEvent('ERROR fetching channel section', { error: err });
    });
    const playlists =
      (await fetchPlaylistsWrapper(channelSection).catch((err) => {
        setError(true);
        logEvent('ERROR fetching playlists', { error: err });
      })) || [];

    setLoading(false);
    setData(playlists);
  }

  useEffect(() => {
    getPlaylists();
  }, []);

  const takeToItem = (item) => {
    const { id, title, description, thumbnails: { maxres = {} } = {} } = item;

    logEvent('TAP Past Series', { series_name: title });
    navigation.navigate('Playlist', {
      playlistID: id,
      playlistTitle: title,
      playlistDescription: description,
      playlistURI: maxres.url,
    });
  };

  const PastSeriesSection = ({ sectionData = [] }) => {
    if (!sectionData || !sectionData.length) {
      return null;
    }

    return (
      <>
        <Text style={styles.sectionHeaderText}>PAST SERIES</Text>
        <View style={styles.pastSeriesList}>
          {sectionData.map((item) => {
            if (item) {
              return (
                <YouTubeDataView
                  key={item.title}
                  item={item}
                  thumbnailStyle={styles.youtubeThumbnailImageSmall}
                  style={styles.smallCard}
                />
              );
            }
            return null;
          })}
        </View>
      </>
    );
  };

  const YouTubeDataView = ({ item = {}, style, thumbnailStyle } = {}) => {
    const { title, thumbnails: { maxres = {} } = {} } = item;

    return (
      <TouchableOpacity
        onPress={() => {
          takeToItem(item);
        }}
      >
        <View style={style}>
          {maxres.url ? (
            <Image
              source={{ uri: maxres.url }}
              style={thumbnailStyle}
              resizeMode="cover"
            />
          ) : (
            <Text
              style={{
                color: Colors.darkestGray,
                margin: 8,
                textAlign: 'center',
              }}
            >
              {title}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { flex: 1, paddingTop: insets.top }]}>
        <Text XXL bold style={styles.headerTitle}>
          MEDIA
        </Text>
        <Spinner />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text XXL bold style={styles.headerTitle}>
          MEDIA
        </Text>
        <View style={styles.error}>
          <Subtitle center>
            Oh no! There was an error connecting to YouTube 😞
          </Subtitle>
          <Heading center>
            {`Make sure you're connected to the internet`}
          </Heading>
          <Button
            title={'Retry'}
            style={styles.notesButton}
            onPress={() => {
              setError(false);
              setLoading(true);
              getPlaylists();
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      ref={ref}
      style={[styles.container, { paddingTop: insets.top }]}
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
          <MaterialIcons name={'speaker-notes'} size={24} color={Colors.gray} />
        }
        title="Message Notes"
        style={styles.notesButton}
        onPress={() => {
          logEvent('TAP Message Notes');
          Linking.openURL('https://echo.church/messagenotes');
        }}
      />

      <PastSeriesSection sectionData={data} />

      <Subtitle style={styles.sectionHeaderText}>RESOURCES</Subtitle>
      <TouchableHighlight
        style={{ marginBottom: insets.bottom + 16 }}
        onPress={() => {
          logEvent('TAP Rightnow Media');
          Linking.openURL(
            'https://www.rightnowmedia.org/Account/Invite/EchoChurch'
          );
        }}
      >
        <Image
          source={require('../assets/images/rightnow_media.jpg')}
          style={[
            styles.youtubeThumbnailImageLarge,
            { height: screenWidth / 2, marginLeft: 16, marginBottom: 16 },
          ]}
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
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  headerTitle: {
    marginVertical: 10,
    marginLeft: 16,
    color: Colors.red,
  },
  sectionHeaderText: {
    marginLeft: 16,
  },
  largeCard: {
    width: screenWidth - 32,
    height: (screenWidth - 32) / 2,
    marginLeft: 16,
    borderRadius: 8,
  },
  pastSeriesList: {
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  smallCard: {
    width: (screenWidth - 48) / 2,
    height: (2 * (screenWidth - 48)) / 7,
    marginBottom: 32,
    marginLeft: 16,
    borderRadius: 8,
    backgroundColor: Colors.white,
    overflow: 'hidden',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notesButton: {
    margin: 16,
    marginBottom: 30,
    width: screenWidth - 32,
  },
  youtubeThumbnailImageSmall: {
    flex: 1,
    backgroundColor: Colors.white,
    height: undefined,
    width: (screenWidth - 48) / 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  youtubeThumbnailImageLarge: {
    flex: 1,
    borderRadius: 8,
    height: undefined,
    width: screenWidth - 32,
    overflow: 'hidden',
  },
});

export default MediaScreen;
