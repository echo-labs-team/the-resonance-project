import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {
  Title,
  Subtitle,
  Heading,
  Text,
} from '../components/shared/Typography';

function FeaturedDetails({ route: { params } }) {
  const { title, scripture, body, prayer } = params;

  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
        <View style={[styles.mainContainer, { paddingTop: headerHeight }]}>
          <ImageBackground
            source={require('../assets/images/hp-bg.jpg')}
            style={styles.backgroundImage}
          />
          <ScrollView style={styles.container}>
            <Title center>{title}</Title>
            <Subtitle italic style={styles.text}>
              "{scripture}"
            </Subtitle>
            <Text style={styles.text}>{body}</Text>
            <Heading style={styles.heading}>🙏 PRAYER</Heading>
            <Text italic style={[styles.white, { marginBottom: headerHeight }]}>
              {prayer}
            </Text>
          </ScrollView>
        </View>
      )}
    </HeaderHeightContext.Consumer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.darkestGray,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 18,
  },
  backgroundImage: {
    width: '100%',
    height: Layout.window.height,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.25,
  },
  heading: {
    marginBottom: 10,
    color: Colors.white,
  },
  text: { color: Colors.white },
});

export default FeaturedDetails;
