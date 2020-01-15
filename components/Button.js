import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import Colors from '../constants/Colors';

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
      <View style={{ marginLeft: icon ? -10 : 0, marginRight: icon ? 10 : 0 }}>
        {icon}
      </View>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: Colors.darkGray,
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 18,
  },
});
