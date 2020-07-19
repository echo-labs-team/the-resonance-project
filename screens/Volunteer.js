import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';
import logEvent from '../utils/logEvent';
import Colors from '../constants/Colors';
import {
  Text,
  Title,
  Subtitle,
  Heading,
} from '../components/shared/Typography';
import Button from '../components/shared/Button';

const VolunteerScreen = () => {
  return (
    <HeaderHeightContext.Consumer>
      {(headerHeight) => (
        <ScrollView
          style={[styles.mainContainer, { paddingTop: headerHeight }]}
        >
          <Image
            source={require('../assets/images/volunteer.jpg')}
            style={styles.image}
          />
          <View style={[styles.container, { paddingBottom: headerHeight }]}>
            <Title style={styles.heading}>Volunteering</Title>

            <Subtitle>Attend One Serve One</Subtitle>
            <Text style={styles.content}>
              {`Great things can happen when we work together. That's why we encourage everyone to attend one service, then serve during another service or hour of the week.`}
            </Text>

            <Subtitle>Why Volunteers Matter</Subtitle>
            <Text style={styles.content}>
              {`Volunteering is a great opportunity to use your time, energy, and skills to make a real difference in someone's life. Whether you are enthusiastically greeting our guests, holding babies in the nursery, or playing the drums on stage, every volunteer has a part in the life transformation that happens each week at Echo.Church. Join a team and experience the joy of knowing that God used your life to make an eternal impact.`}
            </Text>

            <Subtitle>{`What's the Commitment?`}</Subtitle>
            <Text style={styles.content}>
              When you join our Dream Team, you are assigned a team leader who
              will work with you to create a serving schedule that best fits
              your availability. We encourage most people to serve once a week
              whenever possible, but many teams have volunteers rotating every
              other week or even once a month. You can switch teams at any time
              by talking to your team leader.
            </Text>

            <Subtitle>Where can I serve?</Subtitle>
            <Text style={styles.content}>
              There are numerous teams that need volunteers in order for
              Echo.Church to run as it does!
            </Text>
            <Heading>
              Here are a few areas in which you can make a difference:
            </Heading>
            <Text style={styles.listItem}>{'\u2022 Guest Experience'}</Text>
            <Text style={styles.listItem}>{'\u2022 Production'}</Text>
            <Text style={styles.listItem}>{'\u2022 Worship'}</Text>
            <Text style={styles.listItem}>{'\u2022 echoKIDS'}</Text>
            <Text style={styles.listItem}>{'\u2022 Echo Students'}</Text>
            <Text style={styles.listItem}>{'\u2022 Connections'}</Text>

            <Button
              title="Sign Up"
              style={styles.button}
              onPress={() => {
                logEvent('TAP Volunteer Sign Up');
                WebBrowser.openBrowserAsync(
                  'https://echo.church/volunteerform',
                  { toolbarColor: Colors.darkestGray }
                ).catch((err) => {
                  logEvent('ERROR with WebBrowser', { error: err.message });
                  WebBrowser.dismissBrowser();
                });
              }}
            />
          </View>
        </ScrollView>
      )}
    </HeaderHeightContext.Consumer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.darkestGray,
  },
  image: {
    width: '100%',
    height: 300,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  heading: {
    marginVertical: 10,
  },
  content: {
    marginBottom: 30,
  },
  listItem: {
    marginVertical: 4,
    marginHorizontal: 10,
  },
  button: { marginVertical: 20 },
});

export default VolunteerScreen;
