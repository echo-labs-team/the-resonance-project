// @flow

import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { WebBrowser } from 'expo';
import Colors from '../constants/Colors';
import EchoLogo from '../components/EchoLogo';
import Button from '../components/Button';

type Props = {
  navigation: Object,
};

export default class GroupsScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Groups',
  };

  handleOpenGroups = () => {
    WebBrowser.openBrowserAsync('https://stage.groups.echo.church');
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.banner, styles.red]}>
          <View style={styles.logo}>
            <EchoLogo
              width={200}
              height={200}
              color={'rgba(255, 255, 255, 0.25)'}
            />
          </View>
          <Text style={styles.heading}>Echo Groups</Text>
          <Text style={styles.text}>
            One of the best ways for you to grow in your journey of faith,
            connect in friendships with others, and serve the world around you.
          </Text>
        </View>

        <View style={[styles.banner, styles.blue]}>
          <Text style={[styles.heading, styles.center]}>Join a Group</Text>
          <Text style={[styles.text, styles.center]}>
            Ready to join a group? Explore groups by topic or location.
          </Text>
          <Button
            title="Explore All Groups"
            onPress={this.handleOpenGroups}
            style={styles.button}
          />
        </View>

        <View style={[styles.banner, styles.gray]}>
          <Text style={[styles.text, styles.blackText]}>
            Echo Groups are usually 8 to 15 people that meet regularly in homes,
            parks, coffee shops, etc. around the Bay Area. Our groups range in
            topics, with everything from hiking, to marriage focus, to financial
            workshops, to in-depth Bible studies. Whether you are exploring
            faith in God or you have been a long-time follower of Jesus, Echo
            Groups are one of the best ways for you to grow in your journey of
            faith, connect in friendships with others, and learn to make a
            difference.
          </Text>
          <Text style={styles.semesterHeader}>Semester Cycles</Text>
          <Text style={styles.semesterText}>
            Echo Groups run in four-month cycles (semesters), which allows you
            the option to switch groups according to your season of life.
          </Text>
          <View style={styles.season}>
            <Text style={styles.seasonLabel}>Spring:</Text>
            <Text style={styles.seasonText}>Feb – May (sign-ups in Jan)</Text>
          </View>
          <View style={styles.season}>
            <Text style={styles.seasonLabel}>Summer:</Text>
            <Text style={styles.seasonText}>Jun – Jul (sign-ups in May)</Text>
          </View>
          <View style={styles.season}>
            <Text style={styles.seasonLabel}>Fall:</Text>
            <Text style={styles.seasonText}>Sep – Dec (sign-ups in Aug)</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.darkGray,
  },
  banner: {
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  red: {
    backgroundColor: Colors.red,
  },
  blue: {
    backgroundColor: Colors.blue,
  },
  gray: {
    backgroundColor: Colors.gray,
  },
  logo: {
    position: 'absolute',
    top: -26,
    left: -100,
  },
  heading: {
    fontSize: 30,
    color: Colors.white,
  },
  text: {
    fontSize: 16,
    color: Colors.white,
  },
  blackText: {
    color: Colors.black,
  },
  button: {
    marginTop: 20,
  },
  semesterHeader: {
    marginTop: 16,
    fontSize: 30,
  },
  semesterText: {
    marginTop: 16,
    fontSize: 16,
  },
  season: {
    marginTop: 6,
    flexDirection: 'row',
  },
  seasonLabel: {
    marginRight: 4,
    fontSize: 16,
    fontWeight: '600',
  },
  seasonText: {
    fontSize: 16,
  },
});
