import React from 'react';
import { StyleSheet, View, ScrollView, ImageBackground } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import Text from '../components/Text';
import Button from '../components/Button';

function getPushPayCampus(campus) {
  switch (campus) {
    case 'NSJ':
      return 'echochurchnorth';
    case 'SSJ':
      return 'echochurchsouth';
    case 'SVL':
      return 'echochurchsunnyvale';
    case 'FMT':
      return 'echochurchfremont';
    default:
      return 'echochurchonline';
  }
}

const GivingScreen = () => {
  const handleGive = campus => {
    WebBrowser.openBrowserAsync(
      `https://pushpay.com/g/${getPushPayCampus(campus)}`
    );
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('../assets/images/giving_bg.png')}
        style={styles.backgroundImage}
      />
      <ScrollView style={styles.container} {...getHeaderInset()}>
        <Text bold style={styles.headerTitle}>
          GIVING
        </Text>
        <Text style={styles.header}>Changing lives together</Text>
        <Text style={styles.content}>
          We believe that Christians ought to be the most generous people on
          Earth, because our God is a generous God — giving to us sacrificially
          over and over again. By contributing financially, you can be a part of
          changing people’s lives forever.
        </Text>

        <Button
          title="North San Jose"
          onPress={() => handleGive('NSJ')}
          style={styles.button}
        />
        <Button
          title="South San Jose"
          onPress={() => handleGive('SSJ')}
          style={styles.button}
        />
        <Button
          title="Sunnyvale"
          onPress={() => handleGive('SVL')}
          style={styles.button}
        />
        <Button
          title="Fremont"
          onPress={() => handleGive('FMT')}
          style={styles.button}
        />
        <Button
          title="Online"
          onPress={() => handleGive()}
          style={styles.button}
        />
      </ScrollView>
    </View>
  );
};

GivingScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 30,
    color: Colors.red,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.7,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 20,
    color: Colors.white,
  },
  content: {
    marginBottom: 20,
    fontSize: 16,
    color: Colors.gray,
  },
  button: { marginVertical: 10 },
});

export default GivingScreen;
