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

const MediaScreen = () => {
  const [isLive, setLive] = useState(true);
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
    setLoading(false)
  }
  if (isLoading) {
    return(
      <View style={styles.container}>
      <Spinner/>
      </View>
    )
  }
  return (
    <ScrollView style={styles.container} {...getHeaderInset()}>
      {isLive ? (
        <View>
        <Text style={styles.sectionHeaderText}>WATCH NOW</Text>
        <WebView
          javaScriptEnabled={true}
          style={styles.largeCard}
          source={{uri:'https://echochurchlive.churchonline.org'}}
        />
        <Button
          title={'Notes'}
          style={styles.notesButton}
          onPress={() => Linking.openURL('https://www.bible.com/events/652292')}
        />
        </View>) : (<View />)
      }
      {
        // <MediaSection
        //   text={'CURRENT SERIES'}
        //   uri={'https://www.youtube.com/embed/6djUI-u0rrA?controls=0&showinfo=0'}
        // />\
      }
      <Text style={styles.sectionHeaderText}>PAST SERIES</Text>
      <PastSeriesSection data={data}/>
      <Text style={styles.sectionHeaderText}>RESOURCES</Text>
      <Button
        title={'RightNow Media'}
        style={styles.notesButton}
        onPress={() => Linking.openURL('https://www.rightnowmedia.org/Account/Invite/EchoChurch')}
      />
    </ScrollView>
  );
};

const MediaSection = props => {
  return (
    <View>
      <Text
        style={[
          TextStyles.subtitle,
          { paddingLeft: 16, paddingTop: 32, paddingBottom: 8 },
        ]}
      >
        {props.text}
      </Text>
      {props.uri ? (
        <WebView
          javaScriptEnabled={true}
          style={styles.largeCard}
          source={props}
        />
      ) : (
        <View />
      )}
      {props.buttonUri ? (
        <Button
          title={props.buttonText}
          style={styles.notesButton}
          onPress={() => Linking.openURL(props.buttonUri)}
        />
      ) : (
        <View />
      )}
    </View>
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
  data = props.data
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={obj => obj['snippet']['localized']['title']}
        data={data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        numColumns={2}
        renderItem={({ index, item }) => {
          const name = item['snippet']['localized']['title'];
          const img = item['snippet']['thumbnails']['standard'];
          return (
            <TouchableOpacity
              onPress={() => {
                takeToItem(item);
              }}
            >
              <View style={styles.smallCard}>
                <Image
                  onPress={() => console.log('1st')}
                  source={img}
                  style={styles.youtubeThumbnailImage}
                  resizeMode="contain"
                />
                <Text style={[TextStyles.subtitle, { textAlign: 'center' }]}>
                  {name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        style={styles.list}
      />
    </View>
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
    height: screenWidth / 2,
    marginLeft: 16,
    borderRadius: 8,
  },
  list: {
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  smallCard: {
    width: (screenWidth - 48) / 2,
    height: (screenWidth - 16) / 2 - 32,
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
  youtubeThumbnailImage: {
    flex: 1,
    height: undefined, 
    width: (screenWidth - 48)/2, 
  }
});

export default MediaScreen;
