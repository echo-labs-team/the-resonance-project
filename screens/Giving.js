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

const GivingScreen = () => {
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
          title="North San Jose"
          onPress={() => handleGive('north')}
          style={styles.button}
        />
        <Button
          title="Sunnyvale"
          onPress={() => handleGive('sunnyvale')}
          style={styles.button}
        />
        <Button
          title="Fremont"
          onPress={() => handleGive('fremont')}
          style={styles.button}
        />
        <Button
          title="Online"
          onPress={() => handleGive('online')}
          style={styles.button}
        />
        <Button
          title={build}
          onPress={() => Clipboard.setString(build)}
          style={styles.sha_button}
          textStyle={{ color: 'rgba(255, 255, 255, 0.20)', fontSize: 14 }}
        />
      </ScrollView>
    </View>
  );
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
    marginVertical: 10,
    color: Colors.red,
  },
  backgroundImage: {
    width: '100%',
    height: Layout.window.height,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.7,
  },
  content: { marginBottom: 20 },
  button: { marginVertical: 10 },
  sha_button: {
    minHeight: 15,
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
});

export default GivingScreen;
