import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Amplitude from 'expo-analytics-amplitude';
import Colors from '../constants/Colors';
import Text from '../components/Text';
import Button from '../components/Button';

// eslint-disable-next-line
export default ({ tryAgain }) => {
  useEffect(() => {
    Amplitude.logEventWithProperties('errorWithGroups', {
      app: 'mobile',
      mainTray: 'Groups',
    });
  }, []);

  const hasTryAgain =
    tryAgain && {}.toString.call(tryAgain) === '[object Function]';

  return (
    <View style={{ padding: 40, justifyContent: 'center' }}>
      <Text light style={styles.title}>
        Something went wrong...
      </Text>
      {hasTryAgain && <Button title="Try Again" onPress={() => tryAgain()} />}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontSize: 24,
    textAlign: 'center',
    color: Colors.white,
  },
});
