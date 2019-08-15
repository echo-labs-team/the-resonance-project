import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import Text from '../components/Text';
import Button from '../components/Button';

const MissionsScreen = () => {
  return (
    <ScrollView style={styles.mainContainer} {...getHeaderInset()}>
      <Image
        source={require('../assets/images/missions.png')}
        style={styles.image}
      />
      <View style={styles.container}>
        <Text style={styles.heading}>Echoing Around the World</Text>
        <Text style={styles.content}>
          Mission trips give Echo.Church a chance to serve and encourage our
          partner churches and missionaries around the world, as well as an
          opportunity for our faith to be stretched and our eyes to be opened to
          what God is doing beyond our region.
        </Text>

        <Text style={styles.heading}>Some of our current mission trips</Text>
        <Text bold style={styles.subHeading}>
          BRAZIL
        </Text>
        <Text style={[styles.subHeading, { marginTop: 0 }]}>
          July 24 – August 1, 2019
        </Text>
        <Text style={styles.content}>
          An opportunity to serve local churches in a very under-resourced area
          in the northeast of Brazil. Hear stories, play with children, and
          participate in projects that help release kids from poverty and set
          them up to succeed in life.
        </Text>

        <Text bold style={styles.subHeading}>
          MEXICO
        </Text>
        <Text style={[styles.subHeading, { marginTop: 0 }]}>
          July 28 – August 3, 2019
        </Text>
        <Text style={styles.content}>
          {`Help build a house for our partners who run a teen drug rehab center, serve children at an orphanage dedicated to sexually abused children, and share God's love in practical ways to people in our target village.`}
        </Text>

        <Text bold style={styles.subHeading}>
          SOUTH EAST ASIA
        </Text>
        <Text style={[styles.subHeading, { marginTop: 0 }]}>Early 2020</Text>
        <Text style={styles.content}>
          Use your business skills or passion for coffee (marketing, design,
          web...) to help our partners in South East Asia build a coffee
          business used as a bridge to take the message of Jesus in one of the
          most unreached countries in the world.
        </Text>

        <Button
          title="Get More Information"
          style={styles.button}
          onPress={() =>
            WebBrowser.openBrowserAsync(
              'https://docs.google.com/forms/d/e/1FAIpQLSd2IHpjbRbd-rqy_tpLc2_Wyex9RBgDpCD_KG6FZgXQJxhCLw/viewform'
            )
          }
        />
        <Button
          title="Join a Mission"
          style={styles.button}
          onPress={() =>
            WebBrowser.openBrowserAsync(
              'https://docs.google.com/forms/d/e/1FAIpQLSdiu651dbn1PzjxrVpkhHQlfxwJj9reWWIwIx3fhVFdSv3YvA/viewform'
            )
          }
        />
        <Button
          title="Fund a Mission"
          style={styles.button}
          onPress={() =>
            WebBrowser.openBrowserAsync(
              'https://pushpay.com/pay/echochurchpayments'
            )
          }
        />
      </View>
    </ScrollView>
  );
};

MissionsScreen.navigationOptions = {
  headerTitle: () => <Text style={styles.header}>MISSIONS</Text>,
};

const styles = StyleSheet.create({
  header: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 26,
    color: Colors.red,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.darkestGray,
  },
  image: {
    width: '100%',
    height: 250,
  },
  container: { paddingVertical: 20, paddingHorizontal: 16 },
  heading: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 20,
    color: Colors.white,
  },
  subHeading: {
    marginVertical: 10,
    fontSize: 18,
    color: Colors.white,
  },
  content: {
    marginBottom: 20,
    fontSize: 16,
    color: Colors.gray,
  },
  button: { marginVertical: 10 },
});

export default MissionsScreen;
