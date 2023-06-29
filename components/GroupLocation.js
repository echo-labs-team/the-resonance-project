import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Heading } from './shared/Typography';

export default ({ city, isOnline = false }) => {
  if (isOnline) {
    return (
      <View style={styles.container}>
        <Heading>Location</Heading>
        <Text style={styles.line}>Meets Online</Text>
      </View>
    );
  }

  if (city) {
    return (
      <View style={styles.container}>
        <Heading>Location</Heading>
        <Text>{city}</Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  line: { marginBottom: 10 },
});
