import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';

export default class EngageScreen extends React.Component {
  static navigationOptions = {
    title: 'ENGAGE',
  };

  render() {
    return (
      <ScrollView style={styles.container} {...getHeaderInset()}>
        <Text style={{ textAlign: 'center', color: Colors.white }}>
          Engage stuff goes here
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
