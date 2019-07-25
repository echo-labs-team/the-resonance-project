import React from 'react';
import { ScrollView, StyleSheet, WebView, Linking } from 'react-native';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import Button from '../components/Button';

const MediaScreen = () => {
  return (
    <ScrollView style={styles.container} {...getHeaderInset()}>
      <WebView
        style={{
          width: '100%',
          height: 300,
        }}
        javaScriptEnabled={true}
        source={{ uri: 'https://www.youtube.com/embed/wZZ7oFKsKzY' }}
      />
      <Button
        title="Notes"
        onPress={() => Linking.openURL('https://www.bible.com/events/652292')}
      />
    </ScrollView>
  );
};

MediaScreen.navigationOptions = {
  title: 'MEDIA',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkestGray,
  },
});

export default MediaScreen;
