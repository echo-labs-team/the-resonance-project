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
    console.log('no `onPress` handler supplied');
  },
}) => (
  <TouchableHighlight
    style={[styles.button, style]}
    onPress={onPress}
    underlayColor={Colors.blue}
  >
    <View style={styles.wrapper}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    minHeight: 60,
    backgroundColor: Colors.darkGray,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
  },
  icon: { marginRight: 10 },
});
