import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Colors from '../../constants/Colors';
import { Text } from './Typography';

export default function Input(props) {
  const { label, touched, errors, ...inputProps } = props;
  const showError = errors && touched;

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
        style={[
          styles.input,
          { borderColor: showError ? Colors.red : Colors.darkGray },
        ]}
        {...inputProps}
      />
      {showError && (
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
    marginBottom: 4,
    color: Colors.lightGray,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    zIndex: 1,
    fontSize: 18,
    color: Colors.white,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: Colors.darkestGray,
  },
  error: {
    width: '100%',
    paddingVertical: 10,
  },
});
