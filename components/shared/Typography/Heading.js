import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../../../constants/Colors';
import { Text } from './Text';

export function Heading(props) {
  return (
    <Text bold {...props} style={[styles.title, props.style]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    lineHeight: 24,
    color: Colors.lightGray,
  },
});
