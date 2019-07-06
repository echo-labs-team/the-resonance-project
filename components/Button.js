import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';
import Colors from '../constants/Colors';

export default ({
  title = '',
  style = {},
  textStyle = {},
  onPress = () => {
    console.log('no `onPress` handler supplied');
  },
}) => (
  <TouchableHighlight
    style={[styles.button, style]}
    onPress={onPress}
    underlayColor={Colors.blue}
  >
    <Text style={[styles.text, textStyle]}>{title.toUpperCase()}</Text>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: Colors.darkBlue,
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
  },
});
