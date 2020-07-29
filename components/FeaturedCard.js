import React from 'react';
import {
  ImageBackground,
  Image,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import logEvent from '../utils/logEvent';
import Colors from '../constants/Colors';
import { Title, Subtitle } from './shared/Typography';
import { styles } from './HomeCard';

function FeaturedCard() {
  const navigation = useNavigation();

  return (
    <TouchableHighlight
      underlayColor={Colors.darkBlue}
      style={[styles.card, { height: 300 }]}
      onPress={() => {
        logEvent('TAP post', { post_type: 'featured' });
        navigation.navigate('Featured');
      }}
    >
      <View style={cardStyles.mainContainer}>
        <ImageBackground
          progressiveRenderingEnabled
          source={{
            uri:
              'https://echo.church/wp-content/uploads/2020/05/Hope-Project_TitleSlideFinal111.jpg',
          }}
          style={cardStyles.backgroundImage}
        />
        <View style={cardStyles.container}>
          <View style={cardStyles.wrapper}>
            <Image
              progressiveRenderingEnabled
              source={{
                uri:
                  'https://echo.church/wp-content/uploads/elementor/thumbs/HP_WhiteIcon-1-opizmnxv1bqwwsj6ih2c78mebgu69hsmb89bs0b45s.png',
              }}
              style={cardStyles.logo}
            />
            <Feather
              name={'chevron-right'}
              size={40}
              color={Colors.white}
              style={cardStyles.chevron}
            />
          </View>
          <Title bold style={cardStyles.title}>
            HOPE PROJECT
          </Title>
          <Subtitle bold style={cardStyles.subtitle}>
            A 40-DAY DEVOTIONAL
          </Subtitle>
        </View>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: { position: 'relative' },
  logo: { width: 120, height: 120 },
  chevron: {
    marginTop: -20,
    position: 'absolute',
    top: '50%',
    right: -60,
  },
  title: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 36,
    lineHeight: 40,
  },
  subtitle: { color: Colors.blue },
});

export default FeaturedCard;
