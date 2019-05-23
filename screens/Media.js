import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class MediaScreen extends React.Component {
  static navigationOptions = {
    title: 'Media',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Media stuff goes here</Text>
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
