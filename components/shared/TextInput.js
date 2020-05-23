import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Colors from '../../constants/Colors';
import { Text } from './Typography';

export default function Input(props) {
  const { label, touched, errors, ...inputProps } = props;

  return (
    <View style={styles.container}>
      {label && (
        <Text S bold style={styles.label}>
          {label}
        </Text>
      )}
      <TextInput
        autoCorrect={false}
        keyboardAppearance="dark"
        returnKeyType="done"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        style={styles.input}
        {...inputProps}
      />
      {errors && touched && (
        <View style={styles.error}>
          <Text S bold style={{ color: Colors.red }}>
            {errors}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 14,
  },
  label: {
    color: Colors.lightGray,
  },
  input: {
    paddingVertical: 10,
    fontSize: 18,
    color: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  error: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: Colors.darkestGray,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
});
