import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import Text from '../components/Text';
import Button from '../components/Button';

const BaptismScreen = () => {
  return (
    <ScrollView style={styles.mainContainer} {...getHeaderInset()}>
      <Image
        source={require('../assets/images/baptism.jpg')}
        style={styles.image}
      />
      <View style={styles.container}>
        <Text style={styles.heading}>What is the meaning of Baptism?</Text>

        <Text style={styles.subHeading}>
          {`It illustrates Christ's burial and resurrection`}
        </Text>
        <Text style={styles.content}>
          {`"For when you were baptized, you were buried with Christ, and in baptism you were also raised with Christ." — COLOSSIANS 2:12`}
        </Text>

        <Text style={styles.subHeading}>
          It illustrates my new life as a Christian
        </Text>
        <Text style={styles.content}>
          {`"When someone becomes a Christian he becomes a brand new person inside. The old life has passed away and a new life has begun!" —2 CORINTHIANS 5:17`}
        </Text>

        <Text style={styles.subHeading}>
          {`Baptism doesn't make you a believer — it shows that you already believe. Baptism does not "save" you — only your faith in Christ does that`}
        </Text>
        <Text style={styles.content}>
          {`"For it is by grace you have been saved, through faith ... it is the gift of God — not by works, so that no one can boast." — EPHESIANS 2:8-9`}
        </Text>

        <Button
          title="I Want to Be Baptized"
          style={styles.button}
          onPress={() =>
            WebBrowser.openBrowserAsync(
              'https://goo.gl/forms/Lc8g3MU0CCxjea9e2',
              { toolbarColor: Colors.darkestGray }
            )
          }
        />
      </View>
    </ScrollView>
  );
};

BaptismScreen.navigationOptions = {
  headerTitle: () => <Text style={styles.header}>Baptism</Text>,
};

const styles = StyleSheet.create({
  header: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 26,
    color: Colors.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.darkestGray,
  },
  image: {
    width: '100%',
    height: 300,
  },
  container: { paddingVertical: 20, paddingHorizontal: 16 },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    color: Colors.white,
  },
  subHeading: {
    marginVertical: 10,
    fontSize: 18,
    color: Colors.white,
  },
  content: {
    marginBottom: 20,
    fontSize: 15,
    color: Colors.gray,
  },
  button: { marginVertical: 10 },
});

export default BaptismScreen;
