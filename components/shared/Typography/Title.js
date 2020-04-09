import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import { Text } from './Text';

export function Title(props) {
  return (
    <Text {...props} style={[styles.title, props.style]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontSize: 28,
    lineHeight: 34,
    color: Colors.white,
  },
});
