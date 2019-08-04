// @flow

import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  FlatList,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Colors from '../constants/Colors';
import TextStyles from '../constants/TextStyles';
import Text from '../components/Text';
import { getSomething } from '../data/wordpress';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const [cardData, setCardData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // fetch data on mount
  useEffect(() => {
    getNewData();
  }, []);

  async function getNewData() {
    const data = await getSomething();

    setTimeout(() => {
      console.log('got news feed', data);
      setCardData(data);
    }, 2000);
  }

  const refresh = () => {
    console.log('fetching news feed');
    setRefreshing(true);
    getNewData().then(() => setRefreshing(false));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            style={{ marginTop: 100, marginBottom: -60 }}
          />
        }
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/echo_logo.png')}
            style={styles.welcomeImage}
          />
        </View>

        {cardData && (
          <FlatList
            keyExtractor={({ title }) => title}
            data={cardData}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => {
              return (
                <View style={{ alignItems: 'center' }}>
                  <Card data={item} />
                </View>
              );
            }}
            style={styles.list}
          />
        )}
      </ScrollView>
    </View>
  );
};

HomeScreen.navigationOptions = {
  header: null,
};

const Card = ({ data }) => {
  const [textHeight, setHeight] = useState(0);
  const [numBodyLines, setNumBodyLines] = useState(3);
  const cardHeight = screenWidth - 16;

  if (textHeight > cardHeight / 2) {
    setNumBodyLines(2);
  }

  const icon = {
    BLOG: require('../assets/icons/Blog.png'),
    'MESSAGE SERIES': require('../assets/icons/Message.png'),
    EVENTS: require('../assets/icons/Events.png'),
    ANNOUNCEMENT: require('../assets/icons/Announcements.png'),
  }[data.type];

  return (
    <View style={styles.card}>
      <Image
        source={data.image}
        style={{
          width: screenWidth - 16,
          height: (screenWidth - 16) / 2,
        }}
      />

      <View
        onLayout={event => {
          const { height } = event.nativeEvent.layout;

          setHeight(height);
        }}
      >
        <View style={styles.cardTypeView}>
          <Image source={icon} style={styles.cardTypeIcon} />
          <Text bold style={styles.cardTypeText}>
            {data.type}
          </Text>
        </View>
        <Text
          style={[TextStyles.title, { paddingLeft: 8, paddingTop: 8 }]}
          numberOfLines={2}
        >
          {data.title}
        </Text>
        <Text style={styles.cardSubtitleText}>
          {`${data.author} | ${formatDate(data.date)}`}
        </Text>
        <Text
          style={[TextStyles.body, { padding: 8 }]}
          numberOfLines={numBodyLines}
        >
          {data.body}
        </Text>
      </View>
    </View>
  );
};

const formatDate = date => {
  return date.toLocaleString('en-us', {
    month: 'long',
    year: 'numeric',
    day: 'numeric',
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.headerBackground,
  },
  contentContainer: {
    paddingBottom: 60,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 10,
  },
  welcomeImage: {
    width: 300,
    resizeMode: 'contain',
  },
  card: {
    width: screenWidth - 16,
    height: screenWidth - 16,
    backgroundColor: Colors.darkestGray,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardSubtitleText: {
    fontSize: 14,
    paddingLeft: 8,
    paddingTop: 8,
    color: Colors.white,
  },
  cardTypeIcon: {
    width: 16,
    height: 16,
  },
  cardTypeText: {
    fontSize: 13,
    paddingLeft: 8,
    color: Colors.white,
  },
  cardTypeView: {
    paddingTop: 16,
    paddingLeft: 8,
    paddingRight: 16,
    flexDirection: 'row',
  },
  separator: {
    height: 16,
  },
});

export default HomeScreen;
