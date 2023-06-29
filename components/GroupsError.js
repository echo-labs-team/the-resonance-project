import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Subtitle } from '../components/shared/Typography';
import Button from './shared/Button';

// eslint-disable-next-line
export default ({ tryAgain }) => {
  const hasTryAgain =
    tryAgain && {}.toString.call(tryAgain) === '[object Function]';

  return (
    <View style={styles.container}>
      <Subtitle center style={styles.title}>
        Something went wrong...
      </Subtitle>
      {hasTryAgain ? (
        <Button onPress={() => tryAgain()} title="Try Again" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 40,
  },
  title: { marginBottom: 20 },
});
