import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { useHandleTabChange } from '../utils/useHandleTabChange';
import { Text } from '../components/shared/Typography';
import Button from '../components/shared/Button';
import { openBrowser } from '../utils/openBrowser';
import { useQuery } from 'react-query';
import axios from 'redaxios';
import htmlParser from 'fast-html-parser';
import ContentLoader, { Rect } from 'react-content-loader/native';

function LoadingButtons() {
  return (
    <View style={{ paddingTop: 8, paddingHorizontal: 16, gap: 24 }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <ContentLoader
          key={`loading-button-${index}`}
          viewBox="0 0 300 60"
          backgroundColor={Colors.darkGray}
          foregroundColor={Colors.darkerGray}
          preserveAspectRatio="none"
          style={{
            height: 60,
            borderRadius: 30,
            backgroundColor: Colors.darkestGray,
            overflow: 'hidden',
          }}
        >
          <Rect x="0" y="0" rx="0" ry="0" width="100%" height="60" />
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

const ConnectScreen = () => {
  useHandleTabChange('Connect');
  const insets = useSafeArea();
  const { isLoading, data } = useQuery('connect', async () => {
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
            paddingTop: 8,
            paddingHorizontal: 16,
            paddingBottom: insets.bottom || 24,
            gap: 24,
          }}
        >
          {data?.buttons.map((button) => (
            <Button
              key={button.text}
              style={{ backgroundColor: getButtonColor(button) }}
              title={button.text}
              onPress={() =>
                openBrowser({ title: button.text, url: button.link })
              }
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  headerTitle: {
    marginVertical: 10,
    marginLeft: 16,
    color: Colors.red,
  },
  backgroundImage: {
    width: '100%',
    height: Layout.window.height,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default ConnectScreen;
