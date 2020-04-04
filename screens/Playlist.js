import React, { useState, useEffect } from 'react';
import {
  AsyncStorage,
  Dimensions,
  Image,
  FlatList,
  StyleSheet,
  Linking,
  TouchableHighlight,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { HeaderHeightContext } from '@react-navigation/stack';
import { useScrollToTop } from '@react-navigation/native';
import * as Amplitude from 'expo-analytics-amplitude';
import Colors from '../constants/Colors';
import Text from '../components/shared/Text';
import Button from '../components/shared/Button';
import Spinner from '../components/shared/Spinner';
import TextStyles from '../constants/TextStyles';
import collectData from '../data/youtube';

const screenWidth = Dimensions.get('window').width;
const storePlaylistData = async (playlistId, data) => {
  await AsyncStorage.setItem(
    `@${playlistId}`,
    JSON.stringify(data)
  ).catch((err) => console.error(err));
};

const getStoredPlaylist = (playlistId) => {
  return AsyncStorage.getItem(`@${playlistId}`).catch((err) =>
    console.error(err)
  );
};

const PlaylistScreen = ({ navigation, route }) => {
  const { playlistId, playlistTitle } = route.params;
  navigation.setOptions({ title: playlistTitle });
  const insets = useSafeArea();
  const ref = React.useRef(null);

  useScrollToTop(ref);

  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);
  async function getVideos() {
    try {
      const storedMedia = await getStoredPlaylist(playlistId);

      if (storedMedia) {
        setData(JSON.parse(storedMedia));
        setLoading(false);
      }

      const fetchedVideos = (await collectData(playlistId)) || [];

      setData(fetchedVideos);
      setLoading(false);
      storePlaylistData(playlistId, fetchedVideos);
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
          <FlatList
            keyExtractor={({ id }) => id}
            data={data}
            renderItem={({
              item: {
                id,
                publishDate,
                title,
                description,
                thumbnails: { maxres = {} } = {},
              } = {},
            }) => (
              <TouchableHighlight
                underlayColor="transparent"
                onPress={() => {
                  Amplitude.logEvent(`OPEN ${title}`);
                  Linking.openURL(`https://www.youtube.com/watch?v=${id}`);
                }}
              >
                <View style={styles.item}>
                  <Image
                    source={{ uri: maxres.url }}
                    style={styles.thumbnailStyle}
                    resizeMode="cover"
                  />
                  <Text bold style={styles.title}>
                    {title}
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={styles.description}
                  >{`${description}...`}</Text>
                </View>
              </TouchableHighlight>
            )}
            style={styles.list}
            ItemSeparatorComponent={() => {
              return <View style={styles.hairline} />;
            }}
          />
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
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    backgroundColor: Colors.white,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  warning: {
    marginVertical: 10,
    fontSize: 28,
    lineHeight: 32,
    color: Colors.red,
    textAlign: 'center',
  },
  item: {
    paddingLeft: 8,
    paddingTop: 8,
  },
  title: {
    paddingTop: 16,
    fontSize: 16,
    color: Colors.white,
    textAlign: 'center',
  },
  hairline: {
    margin: 8,
    backgroundColor: '#A2A2A2',
    height: 1,
    width: screenWidth - 16,
  },
  description: {
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 13,
    textAlign: 'left',
    color: Colors.white,
  },
  thumbnailStyle: {
    paddingLeft: 8,
    paddingTop: 8,
    flex: 1,
    borderRadius: 8,
    height: (4 * (screenWidth - 16)) / 7,
    width: screenWidth - 16,
    overflow: 'hidden',
  },
});

export default PlaylistScreen;
