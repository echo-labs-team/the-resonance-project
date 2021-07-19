import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Colors from '../../constants/Colors';

export default ({ style, spinnerColor = Colors.gray }) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={spinnerColor} />
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
