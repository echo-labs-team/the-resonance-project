import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function CenterView({ children, style }) {
  return <View style={[styles.main, style]}>{children}</View>;
}
