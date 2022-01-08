import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import Colors from '../constants/Colors';
import { styles } from './HomeCard';
import { openBrowser } from '../utils/openBrowser';

function FeaturedCard() {
  return (
    <TouchableHighlight
      underlayColor={Colors.darkBlue}
      style={[styles.card, { height: 300 }]}
      onPress={() => {
        openBrowser({
          title: '21 Days of Prayer',
          url: 'https://echo.church/21days-prayer/',
        });
      }}
    >
      <View style={cardStyles.mainContainer}>
        <ImageBackground
          progressiveRenderingEnabled
          source={{
            uri: 'https://echo.church/wp-content/uploads/2021/12/21-Days-of-Prayer-Cover-5335x2500-1-scaled.jpg',
          }}
          style={cardStyles.backgroundImage}
        />
      </View>
    </TouchableHighlight>
  );
}

const cardStyles = StyleSheet.create({
  mainContainer: { flex: 1 },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Colors.blue,
  },
});

export default FeaturedCard;
