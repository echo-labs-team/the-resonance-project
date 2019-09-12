import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  WebView,
  Linking,
  Dimensions,
  FlatList,
  Image,
  TouchableHighlight,
  TouchableOpacity,
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
  const [isLive, setLive] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const date = new Date();
  if (
    !isLive &&
    date.getDay() === 0 &&
    date.getHours() >= 10 &&
    date.getHours() <= 12
  ) {
    setLive(true);
  }

  if (data.length < 2) {
    const new_data = collectChannelData();
    setData(new_data);
  } else if (isLoading) {
    setLoading(false);
  }
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} {...getHeaderInset()}>
      {isLive ? (
        <View>
          <Text style={styles.sectionHeaderText}>WATCH NOW</Text>
          <WebView
            javaScriptEnabled={true}
            style={styles.largeCard}
            source={{ uri: 'https://echochurchlive.churchonline.org' }}
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
      <Button
        title={'RightNow Media'}
        style={styles.notesButton}
        onPress={() =>
          Linking.openURL(
            'https://www.rightnowmedia.org/Account/Invite/EchoChurch'
          )
        }
      />
    </ScrollView>
  );
};

const takeToItem = item => {
  console.log('you pressed');
  const name = item['snippet']['localized']['title'];
  const url = 'https://www.youtube.com/playlist?list=' + item['id'];
  console.log(name);
  console.log(url);
  Linking.openURL(url);
};

const PastSeriesSection = props => {
  data = props.data;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={obj => obj['snippet']['localized']['title']}
        data={data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        numColumns={2}
        renderItem={({ index, item }) => {
          return (
            <YouTubeDataView
              style={styles.smallCard}
              data={item}
              thumbnailStyle={styles.youtubeThumbnailImageSmall}
            />
          );
        }}
        style={styles.list}
      />
    </View>
  );
};

const YouTubeDataView = props => {
  const item = props.data;
  const name = item['snippet']['localized']['title'];
  const img = item['snippet']['thumbnails']['maxres'];
  return (
    <TouchableOpacity
      onPress={() => {
        takeToItem(item);
      }}
    >
      <View style={props.style}>
        <Image
          onPress={() => console.log('1st')}
          source={img}
          style={props.thumbnailStyle}
          resizeMode="contain"
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
  separator: { height: 16 },
  container: {
    flex: 1,
    backgroundColor: Colors.headerBackground,
  },
  largeCard: {
    width: screenWidth - 32,
    height: 550,
    marginLeft: 16,
    borderRadius: 8,
  },
  currentSeriesCard: {
    width: screenWidth - 16,
    height: (screenWidth - 16) / 2,
    marginLeft: 16,
    borderRadius: 8,
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
  },
  youtubeThumbnailImageLarge: {
    flex: 1,
    height: undefined,
    width: screenWidth - 16,
  },
});

export default MediaScreen;
