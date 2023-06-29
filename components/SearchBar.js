import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default ({
  onChangeText = () => {
    throw new Error('`onChangeText` required');
  },
  value = '',
}) => {
  return (
    <View style={styles.searchBar}>
      <Feather
        color={Colors.gray}
        name="search"
        size={22}
        style={styles.icon}
      />
      <TextInput
        autoCorrect={false}
        keyboardAppearance="dark"
        onChangeText={onChangeText}
        returnKeyType="search"
        style={styles.input}
        testID="search-bar-input"
        value={value}
      />
      {Boolean(value) && (
        <TouchableOpacity onPress={() => onChangeText('')} style={styles.clear}>
          <AntDesign color={Colors.gray} name="close" size={22} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const searchBarBackgroundColor = 'rgba(255,255,255,0.2)';

const styles = StyleSheet.create({
  clear: {
    padding: 8,
    position: 'absolute',
    right: 4,
    top: 0,
  },
  icon: {
    left: 10,
    position: 'absolute',
    top: 8,
  },
  input: {
    borderWidth: 0,
    color: Colors.white,
    fontFamily: 'NunitoSans-Regular',
    fontSize: 18,
    height: 40,
    paddingHorizontal: 40,
  },
  searchBar: {
    backgroundColor: searchBarBackgroundColor,
    borderRadius: 25,
    flex: 1,
    height: 40,
    position: 'relative',
  },
});
