import React, { useState, useEffect } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import * as Amplitude from 'expo-analytics-amplitude';
import axios from 'axios';
import htmlParser from 'fast-html-parser';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import {
  Title,
  Subtitle,
  Heading,
  Text,
} from '../components/shared/Typography';

function PostTitle({ title }) {
  if (!title) {
    return (
      <Placeholder
        Animation={(props) => (
          <Fade {...props} style={{ backgroundColor: Colors.darkGray }} />
        )}
      >
        <PlaceholderLine style={styles.titleLoader} />
      </Placeholder>
    );
  }

  return <Title center>{title}</Title>;
}

function PostSubtitle({ scripture }) {
  if (!scripture) {
    return (
      <Placeholder
        Animation={(props) => (
          <Fade {...props} style={{ backgroundColor: Colors.darkGray }} />
        )}
      >
        <PlaceholderLine style={styles.subtitleLoader} />
      </Placeholder>
    );
  }

  return (
    <Subtitle italic style={styles.text}>
      {scripture}
    </Subtitle>
  );
}

function PostBody({ bodyItems }) {
  if (!bodyItems.length) {
    return (
      <Placeholder
        Animation={(props) => (
          <Fade {...props} style={{ backgroundColor: Colors.darkGray }} />
        )}
      >
        <PlaceholderLine style={styles.bodyLoader} />
        <PlaceholderLine style={styles.bodyLoader} />
        <PlaceholderLine style={styles.bodyLoader} />
      </Placeholder>
    );
  }

  return bodyItems.map((text, index) => (
    <Text
      key={`text-item-${index}`}
      style={[styles.text, { marginBottom: 10 }]}
    >
      {text}
    </Text>
  ));
}

function Prayer({ headerHeight, prayer }) {
  if (!prayer) {
    return (
      <Placeholder
        Animation={(props) => (
          <Fade {...props} style={{ backgroundColor: Colors.darkGray }} />
        )}
      >
        <PlaceholderLine style={styles.bodyLoader} />
      </Placeholder>
    );
  }

  return (
    <Text italic style={[styles.white, { marginBottom: headerHeight }]}>
      {prayer}
    </Text>
  );
}

function FeaturedDetails({ route: { params } }) {
  const { slug } = params;
  const [title, setTitle] = useState('');
  const [scripture, setScripture] = useState('');
  const [bodyItems, setBodyItems] = useState([]);
  const [prayer, setPrayer] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        // always fetch the post just in case there are updates
        const { data } = await axios.get(
          `https://echo.church/wp-json/wp/v2/posts?slug=${slug}&timestamp=${new Date().getTime()}`
        );
        const [
          {
            title: { rendered: postTitle } = {},
            content: { rendered: content } = {},
          } = {},
        ] = data;
        const [, postTitleVerse] = postTitle.match(/\((.*)\)/);

        setTitle(postTitleVerse);

        const $ = htmlParser.parse(content);
        const [
          { childNodes: scriptureChildNodes = [] } = {},
          { childNodes: prayerChildNodes = [] } = {},
        ] = $.querySelectorAll('.elementor-blockquote__content');
        const verses = scriptureChildNodes.pop();
        const prayerText = prayerChildNodes.reduce((text, node = {}) => {
          const { rawText, childNodes } = node;

          // if we just have raw text, just return that
          if (rawText?.trim()) {
            return `${text}\n${rawText.trim()}`;
          }

          // we have some nested nodes...so go get that text
          if (childNodes?.length) {
            const [{ rawText: childText }] = childNodes;

            return `${text}\n${childText.trim()}`;
          }

          return text;
        }, '');

        setScripture(verses?.rawText?.trim());
        setPrayer(prayerText.trim());

        const bodyPs = $.querySelector('#post-body').querySelectorAll('p');
        const textItems = bodyPs.map(({ rawText }) => rawText.trim());

        setBodyItems(textItems);
      } catch (error) {
        Amplitude.logEvent(`ERROR rendering post ${slug}`, { error });
      }
    }

    fetchPost();
  }, []);

  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
        <View style={[styles.mainContainer, { paddingTop: headerHeight }]}>
          <ImageBackground
            progressiveRenderingEnabled
            source={{
              uri:
                'https://echo.church/wp-content/uploads/2020/05/Hope-Project_TitleSlideFinal111.jpg',
            }}
            style={styles.backgroundImage}
          />
          <ScrollView style={styles.container}>
            <PostTitle title={title} />
            <PostSubtitle scripture={scripture} />
            <PostBody bodyItems={bodyItems} />
            <Heading style={styles.heading}>🙏 PRAYER</Heading>
            <Prayer headerHeight={headerHeight} prayer={prayer} />
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
    backgroundColor: Colors.blue,
  },
  titleLoader: {
    width: 200,
    height: 34,
    marginBottom: 20,
    alignSelf: 'center',
    backgroundColor: Colors.darkerGray,
    borderRadius: 8,
  },
  subtitleLoader: {
    height: 300,
    marginBottom: 20,
    backgroundColor: Colors.darkerGray,
    borderRadius: 8,
  },
  bodyLoader: {
    height: 300,
    backgroundColor: Colors.darkerGray,
    borderRadius: 8,
  },
  heading: {
    marginVertical: 10,
    color: Colors.white,
  },
  text: { color: Colors.white },
});

export default FeaturedDetails;
