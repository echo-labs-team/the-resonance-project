import React from 'react';
import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  View,
  Clipboard,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import logEvent from '../utils/logEvent';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { useHandleTabChange } from '../utils/useHandleTabChange';
import { Text, Subtitle } from '../components/shared/Typography';
import Button from '../components/shared/Button';

const build = Constants.manifest?.extra?.TIMESTAMP || '';
const handleGive = (campus) => {
  logEvent(`TAP Giving ${campus}`);
  Linking.openURL(`https://pushpay.com/g/echochurch${campus}`);
};

function GivingScreen() {
  useHandleTabChange('Giving');

  const insets = useSafeArea();

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <ImageBackground
        source={require('../assets/images/giving_bg.png')}
        style={styles.backgroundImage}
      />
      <ScrollView style={styles.container}>
        <Text XXL bold style={styles.headerTitle}>
          GIVING
        </Text>

        <Subtitle>Changing lives together</Subtitle>
        <Text style={styles.content}>
          We believe that Christians ought to be the most generous people on
          Earth, because our God is a generous God — giving to us sacrificially
          over and over again. By contributing financially, you can be a part of
          changing people’s lives forever.
        </Text>

        <Button
          onPress={() => handleGive('north')}
          style={styles.button}
          title="North San Jose"
        />
        <Button
          onPress={() => handleGive('sunnyvale')}
          style={styles.button}
          title="Sunnyvale"
        />
        <Button
          onPress={() => handleGive('fremont')}
          style={styles.button}
          title="Fremont"
        />
        <Button
          onPress={() => handleGive('online')}
          style={styles.button}
          title="Online"
        />
        <Button
          onPress={() => Clipboard.setString(build)}
          style={styles.sha_button}
          textStyle={{ color: 'rgba(255, 255, 255, 0.20)', fontSize: 14 }}
          title={build}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: Layout.window.height,
    left: 0,
    opacity: 0.7,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  button: { marginVertical: 10 },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: { marginBottom: 20 },
  headerTitle: {
    color: Colors.red,
    marginVertical: 10,
  },
  mainContainer: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  sha_button: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    marginVertical: 10,
    minHeight: 15,
  },
});

export default GivingScreen;
