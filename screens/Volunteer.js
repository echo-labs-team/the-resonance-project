import React from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import { HeaderHeightContext } from '@react-navigation/stack';
import * as WebBrowser from 'expo-web-browser';
import * as Amplitude from 'expo-analytics-amplitude';
import Colors from '../constants/Colors';
import Text from '../components/shared/Text';
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
            <Text style={styles.heading}>Volunteering</Text>

            <Text style={styles.subHeading}>Attend One Serve One</Text>
            <Text style={styles.content}>
              {`Great things can happen when we work together. That's why we encourage everyone to attend one service, then serve during another service or hour of the week.`}
            </Text>

            <Text style={styles.subHeading}>Why Volunteers Matter</Text>
            <Text style={styles.content}>
              {`Volunteering is a great opportunity to use your time, energy, and skills to make a real difference in someone's life. Whether you are enthusiastically greeting our guests, holding babies in the nursery, or playing the drums on stage, every volunteer has a part in the life transformation that happens each week at Echo.Church. Join a team and experience the joy of knowing that God used your life to make an eternal impact.`}
            </Text>

            <Text style={styles.subHeading}>{`What's the Commitment?`}</Text>
            <Text style={styles.content}>
              When you join our Dream Team, you are assigned a team leader who
              will work with you to create a serving schedule that best fits
              your availability. We encourage most people to serve once a week
              whenever possible, but many teams have volunteers rotating every
              other week or even once a month. You can switch teams at any time
              by talking to your team leader.
            </Text>

            <Text style={styles.subHeading}>Where can I serve?</Text>
            <Text style={styles.content}>
              There are numerous teams that need volunteers in order for
              Echo.Church to run as it does!
            </Text>
            <Text style={styles.content}>
              Here are a few areas in which you can make a difference:
            </Text>
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
                Amplitude.logEvent('TAP Volunteer Sign Up');
                WebBrowser.openBrowserAsync(
                  'https://echo.church/volunteerform',
                  { toolbarColor: Colors.darkestGray }
                ).catch((err) => {
                  Amplitude.logEventWithProperties('ERROR with WebBrowser', {
                    error: err,
                  });
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
  listItem: {
    marginVertical: 4,
    marginHorizontal: 10,
    fontSize: 15,
    color: Colors.gray,
  },
  button: { marginVertical: 20 },
});

export default VolunteerScreen;
