import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export default ({
  value = '',
  onChangeText = () => {
    throw new Error('`onChangeText` required');
  },
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
        testID="search-bar-input"
        style={styles.input}
        keyboardAppearance="dark"
        autoCorrect={false}
        returnKeyType="search"
        value={value}
        onChangeText={onChangeText}
      />
      {Boolean(value) && (
        <TouchableOpacity style={styles.clear} onPress={() => onChangeText('')}>
          <AntDesign name={'close'} size={22} color={Colors.gray} />
        </TouchableOpacity>
      )}
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
    paddingHorizontal: 40,
    borderWidth: 0,
    fontSize: 18,
    fontFamily: 'NunitoSans-Regular',
    color: Colors.white,
  },
  clear: {
    padding: 8,
    position: 'absolute',
    top: 0,
    right: 4,
  },
});
