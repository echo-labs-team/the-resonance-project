import React, { useReducer } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Text from './Text';
import Button from './Button';
import Colors from '../constants/Colors';
import ModalSheet from './ModalSheet';

const initialState = { firstName: '', lastName: '', email: '' };

function reducer(state, action) {
  switch (action.type) {
    case 'setFirstName':
      return {
        ...state,
        firstName: action.value,
      };
    case 'setLastName':
      return {
        ...state,
        lastName: action.value,
      };
    case 'setEmail':
      return {
        ...state,
        email: action.value,
      };
    default:
      throw new Error();
  }
}

export default props => {
  const [{ firstName, lastName, email }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <ModalSheet buttonTitle="Ask a question">
      <View style={{ flex: 1 }}>
        <Text style={{ marginBottom: 20, fontSize: 28, color: Colors.white }}>
          Ask a question
        </Text>

        <TextInput
          autoCompleteType="name"
          autoCorrect={false}
          placeholder="First name"
          placeholderTextColor={Colors.gray}
          value={firstName}
          onChangeText={value => dispatch({ type: 'setFirstName', value })}
          style={styles.input}
        />
        <TextInput
          autoCompleteType="name"
          autoCorrect={false}
          placeholder="Last name"
          placeholderTextColor={Colors.gray}
          value={lastName}
          onChangeText={value => dispatch({ type: 'setLastName', value })}
          style={styles.input}
        />
        <TextInput
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={Colors.gray}
          value={email}
          onChangeText={value => dispatch({ type: 'setEmail', value })}
          style={styles.input}
        />

        <View style={{ flex: 1, marginBottom: 10, justifyContent: 'flex-end' }}>
          <Button title="Ask" />
        </View>
      </View>
    </ModalSheet>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 10,
    fontSize: 18,
    color: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
});
