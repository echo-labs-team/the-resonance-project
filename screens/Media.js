import React, { useState, useEffect, useRef } from 'react';
import {
  AsyncStorage,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import * as Amplitude from 'expo-analytics-amplitude';
import { MaterialIcons } from '@expo/vector-icons';
// import YouTube from 'react-native-youtube';
import collectChannelData from '../data/youtube';
import Colors from '../constants/Colors';
import TextStyles from '../constants/TextStyles';
import isTheWeekend from '../utils/isTheWeekend';
import Text from '../components/Text';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import LiveCard from '../components/LiveCard';
import * as WebBrowser from 'expo-web-browser';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const trackingOptions = {
  app: 'mobile',
  mainTray: 'Media',
};

const storeMediaData = async data => {
  await AsyncStorage.setItem('@media', JSON.stringify(data)).catch(err =>
    console.error(err)
  );
};

const MediaScreen = () => {
  const insets = useSafeArea();
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);
  useEffect(() => {
    getVideos();
  }, []);

  async function getVideos() {
    try {
      const storedMedia = await AsyncStorage.getItem('@media').catch(err =>
        console.error(err)
      );

      if (storedMedia) {
        setData(JSON.parse(storedMedia));
        setLoading(false);
      }

      const fetchedVideos = (await collectChannelData()) || [];

      setData(fetchedVideos);
      setLoading(false);
      storeMediaData(fetchedVideos);
    } catch (err) {
      console.error('Error getting media', err);

      setError(true);
      setErrorMessage("Make sure you're connected to the internet.");
      setLoading(false);

      Amplitude.logEventWithProperties('errorLoadingMedia', trackingOptions);
    }
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <Text bold style={styles.headerTitle}>
          MEDIA
        </Text>
        <Spinner />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={{ flex: 1, paddingTop: insets.top }}>
        <Text bold style={styles.headerTitle}>
          MEDIA
        </Text>
        <View
          style={[
            styles.container,
            { alignItems: 'center', justifyContent: 'center', padding: 16 },
          ]}
        >
          <Text style={[TextStyles.title, { textAlign: 'center' }]}>
            {' '}
            Oh no! There was an error connecting to YouTube 😞
          </Text>
          <Text
            style={[
              TextStyles.body,
              { textAlign: 'center', color: Colors.darkGray },
            ]}
          >
            {errorMessage}
          </Text>
          <Button
            title={'Retry'}
            style={styles.notesButton}
            onPress={() => {
              setError(false);
              setLoading(true);
              Amplitude.logEventWithProperties(
                'tryReloadingMedia',
                trackingOptions
              );
              getVideos();
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <Text bold style={styles.headerTitle}>
        MEDIA
      </Text>
      {isTheWeekend && (
        <>
          {/* <Text style={styles.sectionHeaderText}>WATCH NOW</Text> */}
          <TouchableHighlight
            onPress={() => {
              Amplitude.logEventWithProperties('mobileEngagementAction', {
                app: 'mobile',
                connect: 'watch live',
              });
              WebBrowser.openBrowserAsync(
                'https://echochurchlive.churchonline.org',
                { toolbarColor: Colors.darkestGray }
              );
            }}
          >
            <LiveCard
              style={styles.largeCard}
              width={styles.largeCard.width}
              height={styles.largeCard.height}
            />
          </TouchableHighlight>
          {/* <WebView
            javaScriptEnabled
            allowsInlineMediaPlayback
            startInLoadingState
            renderLoading={() => <Spinner />}
            injectedJavaScript={`(function() { document.getElementsByClassName('menu')[0].style.display = 'none' })();`}
            style={styles.largeCard}
            source={{ uri: 'https://echochurchlive.churchonline.org' }}
          /> */}
        </>
      )}

      <Text style={styles.sectionHeaderText}>CURRENT SERIES</Text>
      <YouTubeDataView
        style={styles.largeCard}
        data={data[0]}
        thumbnailStyle={styles.youtubeThumbnailImageLarge}
      />
      <Button
        icon={
          <MaterialIcons name={'speaker-notes'} size={24} color={Colors.gray} />
        }
        title="Message Notes"
        style={styles.notesButton}
        onPress={() => {
          Amplitude.logEventWithProperties('mobileEngagementAction', {
            app: 'mobile',
            media: 'Notes',
          });

          Linking.openURL('https://echo.church/messagenotes');
        }}
      />

      <Text style={styles.sectionHeaderText}>PAST SERIES</Text>
      <PastSeriesSection data={data.slice(1, data.length)} />

      <Text style={styles.sectionHeaderText}>RESOURCES</Text>
      <TouchableHighlight
        style={{ marginBottom: insets.bottom + 16 }}
        onPress={() => {
          Amplitude.logEventWithProperties('mobileEngagementAction', {
            app: 'mobile',
            media: 'rightnow media',
          });
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

const takeToItem = ({ id } = {}) => {
  Amplitude.logEventWithProperties('mobileEngagementAction', {
    app: 'mobile',
    media: 'videoPlay',
  });

  Linking.openURL(`https://www.youtube.com/playlist?list=${id}`);
};

const PastSeriesSection = ({ data }) => {
  if (data === null || data.length === 0) {
    return null;
  }

  return (
    <View style={styles.list}>
      {data.map(item => {
        if (item) {
          return (
            <YouTubeDataView
              key={item.title}
              data={item}
              thumbnailStyle={styles.youtubeThumbnailImageSmall}
              style={styles.smallCard}
            />
          );
        }
        return null;
      })}
    </View>
  );
};

const YouTubeDataView = ({ data = {}, style, thumbnailStyle } = {}) => {
  const { title, thumbnails: { maxres = {} } = {} } = data;

  return (
    <TouchableOpacity
      onPress={() => {
        takeToItem(data);
      }}
    >
      <View style={style}>
        <Image
          source={{ uri: maxres.url }}
          style={thumbnailStyle}
          resizeMode="cover"
        />
        <Text
          style={[
            TextStyles.subtitle,
            { textAlign: 'center', color: Colors.gray },
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

MediaScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  sectionHeaderText: {
    ...TextStyles.subtitle,
    paddingLeft: 16,
    paddingTop: 32,
    paddingBottom: 8,
  },
  headerTitle: {
    marginTop: 10,
    marginLeft: 16,
    fontSize: 30,
    color: Colors.red,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.headerBackground,
  },
  largeCard: {
    width: screenWidth - 32,
    height: (screenWidth - 16) / 2,
    marginLeft: 16,
    borderRadius: 8,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  smallCard: {
    width: (screenWidth - 48) / 2,
    height: (screenWidth - 48) / 3,
    marginBottom: 16,
    marginLeft: 16,
    borderRadius: 0,
  },
  notesButton: {
    margin: 16,
    width: screenWidth - 32,
  },
  youtubeThumbnailImageSmall: {
    flex: 1,
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
