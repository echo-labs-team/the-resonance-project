// @flow

import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import textStyles from '../constants/TextStyles';

export default ({
  value = '',
  onChangeText = () => {
    console.log('`onChangeText` required');
  },
}: {
  value: string,
  onChangeText: Function,
}) => {
  return (
    <View style={styles.searchBar}>
      <Feather
        name={'search'}
        size={22}
        color={Colors.gray}
        style={styles.icon}
      />
      <TextInput
        style={[textStyles.body, styles.input]}
        keyboardAppearance="dark"
        returnKeyType="search"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const searchBarBackgroundColor = 'rgba(255,255,255,0.2)';

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    height: 40,
    position: 'relative',
    backgroundColor: searchBarBackgroundColor,
    borderRadius: 25,
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 8,
  },
  input: {
    height: 40,
    paddingLeft: 40,
    fontSize: 18,
    borderWidth: 0,
    color: Colors.white,
  },
});
