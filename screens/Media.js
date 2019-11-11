import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  WebView,
  Linking,
  Dimensions,
  FlatList,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Colors from '../constants/Colors';
import TextStyles from '../constants/TextStyles';
import { getHeaderInset } from '../utils/header';
import Text from '../components/Text';
import Button from '../components/Button';
import YouTube from 'react-native-youtube';
import fetchPlaylistData from '../data/youtube';
import Spinner from '../components/Spinner';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const MediaScreen = () => {
  const [isLive, setLive] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [data, setData] = useState([]);

  if (data.length === 0 && !isError) {
    collectChannelData()
      .then(new_data => {
        setData(new_data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setError(true);
        // setErrorMessage(error.message)
        setErrorMessage("Make sure you're connected to the internet.");
        setLoading(false);
      });
  }

  const date = new Date();
  if (
    !isLive &&
    date.getDay() === 0 &&
    date.getHours() >= 10 &&
    date.getHours() <= 12
  ) {
    setLive(true);
  }

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} {...getHeaderInset()}>
        <Text bold style={styles.headerTitle}>
          MEDIA
        </Text>
        <Spinner />
      </SafeAreaView>
    );
  } else if (isError) {
    return (
      <SafeAreaView style={styles.container} {...getHeaderInset()}>
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
            Oh no! There as an error connecting to YouTube :(
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
            }}
          />
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <ScrollView style={styles.container} {...getHeaderInset()}>
        <Text bold style={styles.headerTitle}>
          MEDIA
        </Text>
        {isLive ? (
          <View>
            <Text style={styles.sectionHeaderText}>WATCH NOW</Text>
            <WebView
              useWebKit={true}
              javaScriptEnabled={true}
              style={styles.largeCard}
              source={{ url: 'https://echochurchlive.churchonline.org' }}
            />
            <Button
              title={'Notes'}
              style={styles.notesButton}
              onPress={() =>
                Linking.openURL('https://www.bible.com/events/652292')
              }
            />
          </View>
        ) : (
          <View />
        )}
        <Text style={styles.sectionHeaderText}>CURRENT SERIES</Text>
        <YouTubeDataView
          style={styles.currentSeriesCard}
          data={data[0]}
          thumbnailStyle={styles.youtubeThumbnailImageLarge}
        />
        <Text style={styles.sectionHeaderText}>PAST SERIES</Text>
        <PastSeriesSection data={data.slice(1, data.length)} />
        <Text style={styles.sectionHeaderText}>RESOURCES</Text>
        <TouchableHighlight onPress={() =>
            Linking.openURL(
              'https://www.rightnowmedia.org/Account/Invite/EchoChurch'
            )
          }>
        <Image
          source={require('../assets/images/rightnow_media.jpg')}
          style={[styles.youtubeThumbnailImageLarge, { height: screenWidth/2, marginLeft: 16, marginBottom: 16, }]}
          resizeMode="cover"
        />
        </TouchableHighlight>
      </ScrollView>
    );
  }
};

const takeToItem = item => {
  console.log('you pressed');
  const name = item.title;
  const url = 'https://www.youtube.com/playlist?list=' + item.id;
  console.log(name);
  console.log(url);
  Linking.openURL(url);
};

const PastSeriesSection = props => {
  data = props.data;
  if (data === null || data.length === 0) {
    return <View />;
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={obj => obj.title}
        data={data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        numColumns={2}
        renderItem={({ index, item }) => {
          if (item) {
            return (
              <YouTubeDataView
                style={styles.smallCard}
                data={item}
                thumbnailStyle={styles.youtubeThumbnailImageSmall}
              />
            );
          } else {
            return <View />;
          }
        }}
        style={styles.list}
      />
    </View>
  );
};

const YouTubeDataView = props => {
  const item = props.data;
  const name = item.title;
  const img = item.thumbnails.maxres;
  console.log(img);
  return (
    <TouchableOpacity
      onPress={() => {
        takeToItem(item);
      }}
    >
      <View style={props.style}>
        <Image
          onPress={() => console.log('1st')}
          source={{ uri: img.url }}
          style={props.thumbnailStyle}
          resizeMode="cover"
        />
        <Text style={[TextStyles.subtitle, { textAlign: 'center' }]}>
          {name}
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
    marginLeft: 16,
    fontSize: 30,
    color: Colors.red,
  },
  separator: { height: 16 },
  container: {
    flex: 1,
    backgroundColor: Colors.headerBackground,
  },
  largeCard: {
    width: screenWidth - 32,
    height: screenHeight - 128,
    marginLeft: 16,
    borderRadius: 8,
  },
  currentSeriesCard: {
    width: screenWidth - 16,
    height: (screenWidth - 16) / 2,
    marginLeft: 16,
    borderRadius: 8,
  },
  errorMessage: {
    color: Colors.white,
    textAlign: 'center',
  },
  list: {
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  smallCard: {
    width: (screenWidth - 48) / 2,
    height: (screenWidth - 48) / 3,
    marginLeft: 16,
    borderRadius: 0,
  },
  pastSeries: {
    width: screenWidth - 32,
    aspectRatio: 2 / 3,
    marginLeft: 16,
    borderRadius: 8,
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
