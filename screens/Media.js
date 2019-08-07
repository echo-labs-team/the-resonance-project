import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  WebView,
  Linking,
  Dimensions,
} from 'react-native';
import Colors from '../constants/Colors';
import TextStyles from '../constants/TextStyles';
import { getHeaderInset } from '../utils/header';
import Text from '../components/Text';
import Button from '../components/Button';

const screenWidth = Dimensions.get('window').width;

const MediaScreen = () => {
  const [isLive, setLive] = useState(false);
  const date = new Date();
  if (
    !isLive &&
    date.getDay() === 0 &&
    date.getHours() >= 10 &&
    date.getHours() <= 12
  ) {
    setLive(true);
  }

  return (
    <ScrollView style={styles.container} {...getHeaderInset()}>
      {isLive ? (
        <MediaSection
          text={'WATCH NOW'}
          uri={'https://echochurchlive.churchonline.org'}
          buttonText={'Notes'}
          buttonUri={'https://www.bible.com/events/652292'}
          onLoadingError={() => {
            setLive(false);
          }}
        />
      ) : (
        <View />
      )}
      <MediaSection
        text={'CURRENT SERIES'}
        uri={'https://www.youtube.com/embed/6djUI-u0rrA?controls=0&showinfo=0'}
      />
      <MediaSection text={'PAST SERIES'} />
      <PastSeriesSection />
      <MediaSection
        text={'RESOURCES'}
        buttonUri={'https://www.rightnowmedia.org/Account/Invite/EchoChurch'}
        buttonText={'RightNow Media'}
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
          style={styles.largeCard}
          javaScriptEnabled={true}
          source={{ uri: props.uri }}
          onError={props.onLoadingError}
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

const PastSeriesSection = props => {
  // return (
  //   <View style={{flex:1}}>
  //     <WebView
  //       style={styles.pastSeries}
  //       javaScriptEnabled={true}
  //       source={{ uri: '' }}
  //     />
  //   </View>

  //   );
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <WebView
          style={styles.smallCard}
          javaScriptEnabled={true}
          source={{
            uri:
              'https://www.youtube.com/embed/6djUI-u0rrA?rel=0&autoplay=0&showinfo=0&controls=0',
          }}
        />
        <WebView
          style={styles.smallCard}
          javaScriptEnabled={true}
          source={{
            uri:
              'https://www.youtube.com/embed/6djUI-u0rrA?rel=0&autoplay=0&showinfo=0&controls=0',
          }}
        />
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <WebView
          style={styles.smallCard}
          javaScriptEnabled={true}
          source={{
            uri:
              'https://www.youtube.com/embed/6djUI-u0rrA?rel=0&autoplay=0&showinfo=0&controls=0',
          }}
        />
        <WebView
          style={styles.smallCard}
          javaScriptEnabled={true}
          source={{
            uri:
              'https://www.youtube.com/embed/6djUI-u0rrA?rel=0&autoplay=0&showinfo=0&controls=0',
          }}
        />
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <WebView
          style={styles.smallCard}
          javaScriptEnabled={true}
          source={{
            uri:
              'https://www.youtube.com/embed/6djUI-u0rrA?rel=0&autoplay=0&showinfo=0&controls=0',
          }}
        />
        <WebView
          style={styles.smallCard}
          javaScriptEnabled={true}
          source={{
            uri:
              'https://www.youtube.com/embed/6djUI-u0rrA?rel=0&autoplay=0&showinfo=0&controls=0',
          }}
        />
      </View>
    </View>
  );
};

MediaScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
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
  smallCard: {
    width: (screenWidth - 64) / 2,
    aspectRatio: 3 / 2,
    marginLeft: 16,
    borderRadius: 8,
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
});

export default MediaScreen;
