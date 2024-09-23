import { AntDesign } from '@expo/vector-icons';
import htmlParser from 'fast-html-parser';
import ContentLoader, { Rect } from 'react-content-loader/native';
import {
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useQuery } from 'react-query';
import axios from 'redaxios';
import Button from '../components/shared/Button';
import { Text } from '../components/shared/Typography';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { openBrowser } from '../utils/openBrowser';
import { useHandleTabChange } from '../utils/useHandleTabChange';

function LoadingButtons() {
  return (
    <View style={{ gap: 24, paddingHorizontal: 16, paddingTop: 8 }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <ContentLoader
          backgroundColor={Colors.darkGray}
          foregroundColor={Colors.darkerGray}
          key={`loading-button-${index}`}
          preserveAspectRatio="none"
          style={{
            backgroundColor: Colors.darkestGray,
            borderRadius: 30,
            height: 60,
            overflow: 'hidden',
          }}
          viewBox="0 0 300 60"
        >
          <Rect height="60" rx="0" ry="0" width="100%" x="0" y="0" />
        </ContentLoader>
      ))}
    </View>
  );
}

function getButtonColor({ text }) {
  if (text === 'Check In') {
    return Colors.red;
  }
  if (text === 'Attend Activate') {
    return Colors.red;
  }
  if (text === 'Give') {
    return Colors.red;
  }
  if (text === 'View the Message Notes') {
    return Colors.darkBlue;
  }

  return Colors.darkGray;
}

function openInstagram() {
  Linking.openURL('https://www.instagram.com/echochurchlive/');
}

function openFacebook() {
  Linking.openURL('https://www.facebook.com/echochurchlive/');
}

function openTwitter() {
  Linking.openURL('https://twitter.com/echochurchlive');
}

function ConnectScreen() {
  useHandleTabChange('Connect');
  const insets = useSafeArea();
  const { data, isLoading } = useQuery('connect', async () => {
    const response = await axios(
      `https://echo.church/wp-json/wp/v2/pages?slug=connect&timestamp=${new Date().getTime()}`,
      { headers: { 'Cache-Control': 'no-cache' } }
    );
    const connectPage = response?.data?.[0] || {};
    const html = connectPage?.content?.rendered || '';
    const $ = htmlParser.parse(html);
    const [, ...sections] = $.querySelectorAll('.elementor-section-boxed');
    const visibleSections = sections.filter((section) => {
      return !section.classNames.includes('elementor-hidden-desktop');
    });
    const buttons = visibleSections.map((section) => {
      const button = {};

      let target = section?.childNodes?.find((node) => Boolean(node.tagName));

      while (target) {
        target = target?.childNodes.find((node) => Boolean(node.tagName));

        if (target?.tagName === 'a') {
          // get the link inside the `href` attribute
          const regex = /href=["']([^"']+)["']/i;
          const link = target?.rawAttrs.match(regex)[1];
          const safeLink = link.replace('http://', 'https://');

          if (safeLink.charAt(0) === '/') {
            button.link = safeLink.replace('/', 'https://www.echo.church/');
          } else {
            button.link = safeLink;
          }
        }
        const buttonText = target?.childNodes.find(
          (node) => node.rawAttrs === 'class="elementor-button-text"'
        );

        if (buttonText) {
          button.text = buttonText?.childNodes[0]?.rawText;
        }
      }

      return button;
    });

    return { buttons };
  });

  return (
    <View style={[styles.mainContainer, { paddingTop: insets.top }]}>
      <ImageBackground
        source={require('../assets/images/connect_bg.png')}
        style={styles.backgroundImage}
      />

      <Text XXL bold style={styles.headerTitle}>
        CONNECT
      </Text>

      {isLoading ? (
        <LoadingButtons />
      ) : (
        <ScrollView
          contentContainerStyle={{
            gap: 24,
            paddingBottom: insets.bottom || 24,
            paddingHorizontal: 16,
            paddingTop: 8,
          }}
        >
          {data?.buttons.map((button) => {
            const handlePress = () => {
              openBrowser({ title: button.text, url: button.link });
            };
            return (
              <Button
                key={button.text}
                onPress={handlePress}
                style={{ backgroundColor: getButtonColor(button) }}
                title={button.text}
              />
            );
          })}
          <View style={styles.social}>
            <AntDesign
              accessibilityLabel="Instagram"
              name="instagram"
              size={40}
              color={Colors.red}
              onPress={openInstagram}
            />
            <AntDesign
              accessibilityLabel="Facebook"
              name="facebook-square"
              size={40}
              color={Colors.red}
              onPress={openFacebook}
            />
            <AntDesign
              accessibilityLabel="Twitter"
              name="twitter"
              size={40}
              color={Colors.red}
              onPress={openTwitter}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    height: Layout.window.height,
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  headerTitle: {
    color: Colors.red,
    marginLeft: 16,
    marginVertical: 10,
  },
  mainContainer: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  social: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 40,
  },
});

export default ConnectScreen;
