import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Colors from '../../constants/Colors';
import { Title } from './Typography';
import Button from './Button';
import EchoLogo from '../../components/EchoLogo';

export function handleError(error, info) {
  console.error({ error, info });
}

function ErrorFallback({ resetErrorBoundary }) {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <EchoLogo width={60} height={60} color={Colors.red} />
        <Title style={styles.title}>Something went wrong... 😕</Title>
        <Button title="Try Again" onPress={resetErrorBoundary} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.headerBackground,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 40,
  },
  title: {
    paddingVertical: 20,
    textAlign: 'center',
  },
});

export default ErrorFallback;
