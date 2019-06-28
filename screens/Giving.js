import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';

export default class GivingScreen extends React.Component {
  static navigationOptions = {
    title: 'GIVING',
  };

  render() {
    return (
      <ScrollView style={styles.container} {...getHeaderInset()}>
        <Text style={{ textAlign: 'center', color: Colors.white }}>
          Giving stuff goes here
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.darkestGray,
  },
});
