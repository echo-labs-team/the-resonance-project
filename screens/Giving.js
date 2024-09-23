import Constants from 'expo-constants';
import {
  Clipboard,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Button from '../components/shared/Button';
import { Subtitle, Text } from '../components/shared/Typography';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import logEvent from '../utils/logEvent';
import { openBrowser } from '../utils/openBrowser';
import { useHandleTabChange } from '../utils/useHandleTabChange';

const build = Constants.manifest?.extra?.TIMESTAMP || '';
const openGiveNow = () => {
  logEvent(`TAP Giving Cash`);
  Linking.openURL('https://donate.overflow.co/echochurch/cash');
};
const openGiveStocks = () => {
  logEvent(`TAP Giving Stocks`);
  Linking.openURL('https://donate.overflow.co/echochurch/stock/select-flow');
};
const openGiveCrypto = () => {
  logEvent(`TAP Giving Crypto`);
  Linking.openURL('https://donate.overflow.co/echochurch/crypto');
};
const openDAF = () => {
  logEvent(`TAP Giving DAF`);
  Linking.openURL('https://donate.overflow.co/echochurch/daf');
};
const openChallenge = () => {
  logEvent(`TAP Giving Challenge`);
  openBrowser({
    title: '90-Day Tithe Challenge',
    url: 'https://www.echo.church/tithechallenge',
  });
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
          onPress={() => openGiveNow()}
          style={styles.button}
          title="Give Now"
        />
        <Button
          onPress={() => openGiveStocks()}
          style={styles.button}
          title="Give Stocks"
        />
        <Button
          onPress={() => openGiveCrypto()}
          style={styles.button}
          title="Give Crypto"
        />
        <Button
          onPress={() => openDAF()}
          style={styles.button}
          title="Donor-Advised Funds"
        />
        <Button
          onPress={() => openChallenge()}
          style={styles.button}
          title="Join 90-Day Tithe Challenge"
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
  button: {
    backgroundColor: Colors.red,
    marginVertical: 10,
  },
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
