import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';

export default () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.red} />
    </View>
  );
};

const backgroundColor = 'rgba(0,0,0,0.75)';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99999,
    backgroundColor,
  },
});
