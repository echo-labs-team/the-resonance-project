import React, { useState, useEffect } from 'react';
import {
  AppState,
  AsyncStorage,
  Platform,
  StatusBar,
  UIManager,
} from 'react-native';
import { AppLoading } from 'expo';
import { Constants } from 'expo-constants';
import * as Amplitude from 'expo-analytics-amplitude';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import resources from './resources';
import keys from './constants/Keys';
import AppNavigator from './navigation/AppNavigator';

Amplitude.initialize(keys.AMPLITUDE);

const channel = Constants?.manifest?.releaseChannel;
const emptyStorage = () =>
  AsyncStorage.multiRemove(['@posts', '@media', '@groups', '@missions']);

// override amplitude tracking
if (!channel) {
  Amplitude.logEvent = (name) => console.log(`[amplitude]: ${name}`);
  Amplitude.logEventWithProperties = (name, data) =>
    console.log(`[amplitude]: ${name}\n`, data);
  emptyStorage();
} else if (channel.indexOf('develop') !== -1) {
  // beta testing from the store--we want to log this to amplitude, but
  //  separate it out
  Amplitude.logEvent = (name) => {
    name = `BETA ${name}`;
    console.log(`[amplitude]: ${name}`);
    Amplitude.logEvent(name);
  };
  Amplitude.logEventWithProperties = (name, data) => {
    name = `BETA ${name}`;
    console.log(`[amplitude]: ${name}\n`, data);
    Amplitude.logEventWithProperties(name, data);
  };
  emptyStorage();
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function App(props) {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  /**
   * Log when our app
   * becomes active (The app is running in the foreground)
   * or runs in the background (The user is either: in another app, on the home screen,
   * or [Android-only] on another Activity, even if it was launched by the app)
   * https://reactnative.dev/docs/appstate
   */
  useEffect(() => {
    const handleAppStateChange = (state) => {
      if (state === 'active') {
        Amplitude.logEvent('Start session');
      }
      if (state === 'background') {
        Amplitude.logEvent('End session');
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, []);

  const loadResourcesAsync = async () => {
    return Promise.all(resources);
  };

  const handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  const handleFinishLoading = () => setIsLoadingComplete(true);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar
        hidden={true}
        animated
        barStyle="light-content"
        networkActivityIndicatorVisible
        showHideTransition="fade"
        translucent
      />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default process.env.REACT_NATIVE_STORYBOOK
  ? require('./storybook').default
  : App;
