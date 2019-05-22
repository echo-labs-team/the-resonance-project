import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class GivingScreen extends React.Component {
  static navigationOptions = {
    title: 'Giving',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Giving stuff goes here</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
