import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Heading } from './shared/Typography';

export default ({ isOnline = false, location: { name, description } = {} }) => (
  <View style={styles.container}>
    <Heading>Location</Heading>
    {isOnline ? (
      <Text>Online</Text>
    ) : (
      <>
        <Text>{name}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  description: { marginTop: 10 },
});
