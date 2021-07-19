import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function CenterView({ children, style }) {
  return (
    <ScrollView contentContainerStyle={[styles.main, style]}>
      {children}
    </ScrollView>
  );
}
