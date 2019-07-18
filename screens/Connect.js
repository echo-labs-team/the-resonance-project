import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import { getHeaderInset } from '../utils/header';
import Text from '../components/Text';

export default class EngageScreen extends React.Component {
  static navigationOptions = {
    title: 'CONNECT',
  };

  render() {
    return (
      <ScrollView style={styles.container} {...getHeaderInset()}>
        <Text style={{ textAlign: 'center', color: Colors.white }}>
          connect stuff goes here
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
