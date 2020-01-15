import React, { useReducer } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Text from './Text';
import Button from './Button';
import Colors from '../constants/Colors';
import { joinGroup } from '../data/groups';
import ModalSheet from './ModalSheet';
import Spinner from '../components/Spinner';

const initialState = {
  loading: false,
  success: false,
  firstName: '',
  lastName: '',
  email: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'setLoading':
      return {
        ...state,
        loading: action.value,
      };
    case 'setSuccess':
      return {
        ...state,
        success: action.value,
      };
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
  const [
    { loading, success, firstName, lastName, email },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleSignUp = () => {
    dispatch({ type: 'setLoading', value: true });

    joinGroup(props.groupID, firstName, lastName, email)
      .then(joinGroupSuccess => {
        if (joinGroupSuccess) {
          // close this modal
          dispatch({ type: 'setLoading', value: false });
          dispatch({ type: 'setSuccess', value: true });
          setTimeout(() => dispatch({ type: 'setSuccess', value: false }), 0);

          props.showSuccess('Thanks for joining ☺️');
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: 'setLoading', value: false });
      });
  };

  return (
    <ModalSheet buttonTitle="Sign Up" success={success}>
      {loading && <Spinner />}

      <View style={{ flex: 1 }}>
        <Text style={{ marginBottom: 40, fontSize: 30, color: Colors.white }}>
          Sign up
        </Text>

        <Text style={{ marginBottom: 30, fontSize: 18, color: Colors.gray }}>
          {`The group leaders will reach out to you with more info once you've joined`}
        </Text>

        <TextInput
          autoCompleteType="name"
          autoCorrect={false}
          keyboardAppearance="dark"
          returnKeyType="done"
          placeholder="First name"
          placeholderTextColor={Colors.gray}
          value={firstName}
          onChangeText={value => dispatch({ type: 'setFirstName', value })}
          style={styles.input}
        />
        <TextInput
          autoCompleteType="name"
          autoCorrect={false}
          keyboardAppearance="dark"
          returnKeyType="done"
          placeholder="Last name"
          placeholderTextColor={Colors.gray}
          value={lastName}
          onChangeText={value => dispatch({ type: 'setLastName', value })}
          style={styles.input}
        />
        <TextInput
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
          keyboardAppearance="dark"
          returnKeyType="done"
          placeholder="Email"
          placeholderTextColor={Colors.gray}
          value={email}
          onChangeText={value => dispatch({ type: 'setEmail', value })}
          style={styles.input}
        />
        <View
          style={{ flex: 1, marginVertical: 10, justifyContent: 'flex-end' }}
        >
          <Button title="Sign Up" onPress={handleSignUp} />
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
    fontSize: 20,
    color: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
});
