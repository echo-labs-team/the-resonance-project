import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default function CenterView({ children, style }) {
  return (
    <ScrollView contentContainerStyle={[styles.main, style]}>
      {children}
    </ScrollView>
  );
}
