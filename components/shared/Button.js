import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import Colors from '../../constants/Colors';
import { Text } from './Typography';

export default ({
  title = '',
  style = {},
  textStyle = {},
  icon,
  onPress = () => {
    throw new Error('no `onPress` handler supplied');
  },
}) => (
  <TouchableHighlight
    onPress={onPress}
    underlayColor={Colors.blue}
    style={[styles.button, style]}
  >
    <View style={styles.wrapper}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  button: {
    minHeight: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkGray,
    borderRadius: 6,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
  },
  icon: { marginRight: 10 },
});
