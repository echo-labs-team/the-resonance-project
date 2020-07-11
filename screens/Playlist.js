import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Linking,
  TouchableHighlight,
  View,
} from 'react-native';
import { useAsyncStorage } from '@react-native-community/async-storage';
import { useSafeArea } from 'react-native-safe-area-context';
import { HeaderHeightContext } from '@react-navigation/stack';
import * as Amplitude from 'expo-analytics-amplitude';
import Colors from '../constants/Colors';
import {
  Text,
  Title,
  Heading,
  Subtitle,
} from '../components/shared/Typography';
import Button from '../components/shared/Button';
import Spinner from '../components/shared/Spinner';
import { fetchPlaylistItems } from '../data/youtube';
import { ScrollView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

const PlaylistScreen = ({ navigation, route }) => {
  const { playlistID, playlistTitle, playlistURI } = route.params;
  const { getItem, setItem } = useAsyncStorage(`@${playlistID}`);
  const insets = useSafeArea();

  navigation.setOptions({ title: playlistTitle });

  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);
  async function getVideos() {
    try {
      const storedMedia = await getItem();

      if (storedMedia) {
        setData(JSON.parse(storedMedia));
        setLoading(false);
      }

      const fetchedVideos = await fetchPlaylistItems(playlistID, 10);

      setData(fetchedVideos);
      setLoading(false);
      await setItem(JSON.stringify(fetchedVideos));
    } catch (err) {
      setError(true);
      setErrorMessage("Make sure you're connected to the internet.");
      setLoading(false);
      Amplitude.logEventWithProperties('ERROR loading playlist items', {
        error: err,
      });
    }
  }
  if (isLoading) {
    return (
      <View style={[styles.container, { flex: 1, paddingTop: insets.top }]}>
        <Text bold style={styles.headerTitle}>
          MEDIA
        </Text>
        <Spinner />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, { flex: 1, paddingTop: insets.top }]}>
        <Text bold style={styles.headerTitle}>
          MEDIA
        </Text>
        <View
          style={[
            styles.container,
            { alignItems: 'center', justifyContent: 'center', padding: 16 },
          ]}
        >
          <Title style={[{ textAlign: 'center' }]}>
            Oh no! There was an error connecting to YouTube 😞
          </Title>
          <Text style={[{ textAlign: 'center', color: Colors.darkGray }]}>
            {errorMessage}
          </Text>
          <Button
            title={'Retry'}
            style={styles.notesButton}
            onPress={() => {
              setError(false);
              setLoading(true);
              getVideos();
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
        <View style={[styles.mainContainer, { paddingTop: headerHeight }]}>
          <ScrollView>
            <Image
              source={
                playlistURI
                  ? { uri: playlistURI }
                  : require('../assets/images/splash.png')
              }
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.description} numberOfLines={4}>
              {data.length ? data[0].description : ''}
            </Text>
            <Subtitle style={styles.subtitle}>IN THIS SERIES</Subtitle>
            <View style={styles.list}>
              {data.map(({ id, title, thumbnails: { maxres = {} } = {} }) => (
                <TouchableHighlight
                  key={id}
                  underlayColor="transparent"
                  onPress={() => {
                    Amplitude.logEvent(`OPEN ${title}`);
                    Linking.openURL(`https://www.youtube.com/watch?v=${id}`);
                  }}
                >
                  <View style={styles.item}>
                    <Image
                      source={
                        maxres.url
                          ? { uri: maxres.url }
                          : require('../assets/images/splash.png')
                      }
                      style={styles.thumbnailStyle}
                      resizeMode="cover"
                    />
                    <Heading style={styles.title}>{title}</Heading>
                  </View>
                </TouchableHighlight>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </HeaderHeightContext.Consumer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  image: {
    marginTop: 16,
    marginBottom: 8,
    marginLeft: 16,
    width: screenWidth - 32,
    height: (screenWidth - 32) / 2,
    borderRadius: 8,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  item: {
    width: screenWidth,
    flexDirection: 'row',
  },
  title: {
    paddingTop: 0,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    flexWrap: 'wrap',
    color: Colors.white,
    textAlign: 'left',
  },
  subtitle: {
    color: Colors.white,
    paddingLeft: 16,
    paddingBottom: 0,
  },
  description: {
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 14,
    textAlign: 'left',
    color: Colors.lightGray,
  },
  thumbnailStyle: {
    width: (screenWidth - 48) / 2,
    height: (2 * (screenWidth - 48)) / 7,
    marginBottom: 16,
    marginLeft: 16,
  },
});

export default PlaylistScreen;
