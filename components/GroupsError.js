import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import Text from '../components/Text';
import Button from '../components/Button';

// eslint-disable-next-line
export default ({ tryAgain = () => {} }) => {
  // useEffect(() => {
  //   amplitude.getInstance().logEvent('error', { message: 'App Error' });
  // }, []);

  return (
    <View style={{ padding: 40, justifyContent: 'center' }}>
      <Text light style={styles.title}>
        Something went wrong...
      </Text>
      <Button title="Try Again" onPress={() => tryAgain()} />
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
