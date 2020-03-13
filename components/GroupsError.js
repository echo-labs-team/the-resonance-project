import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import Text from '../components/shared/Text';
import Button from './shared/Button';

// eslint-disable-next-line
export default ({ tryAgain }) => {
  const hasTryAgain =
    tryAgain && {}.toString.call(tryAgain) === '[object Function]';

  return (
    <View style={styles.container}>
      <Text light style={styles.title}>
        Something went wrong...
      </Text>
      {hasTryAgain && <Button title="Try Again" onPress={() => tryAgain()} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 40,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    textAlign: 'center',
    color: Colors.white,
  },
});
