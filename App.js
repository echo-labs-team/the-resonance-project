import React, { useState, useEffect } from 'react';
import {
  AppState,
  AsyncStorage,
  Platform,
  StatusBar,
  UIManager,
} from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import * as Amplitude from 'expo-analytics-amplitude';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';

Amplitude.initialize('915eae61254cd5eaec60df02369eff57');

if (__DEV__) {
  // override amplitude tracking
  Amplitude.logEvent = name => console.log(`[amplitude]: ${name}`);
  Amplitude.logEventWithProperties = (name, data) =>
    console.log(`[amplitude]: ${name}\n`, data);

  // Erase all AsyncStorage
  AsyncStorage.multiRemove(['@posts', '@media', '@groups', '@missions']);
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default props => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  /**
   * Log when our app
   * becomes active (The app is running in the foreground)
   * or runs in the background (The user is either: in another app, on the home screen,
   * or [Android-only] on another Activity, even if it was launched by the app)
   * https://reactnative.dev/docs/appstate
   */
  useEffect(() => {
    const handleAppStateChange = state => {
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
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/activate.png'),
        require('./assets/images/baptism.jpg'),
        require('./assets/images/volunteer.jpg'),
        require('./assets/images/pray.jpg'),
        require('./assets/images/missions.png'),
        require('./assets/images/connect_bg.png'),
        require('./assets/images/groups_bg.png'),
        require('./assets/images/giving_bg.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        'NunitoSans-Light': require('./assets/fonts/NunitoSans-Light.ttf'),
        'NunitoSans-Regular': require('./assets/fonts/NunitoSans-Regular.ttf'),
        'NunitoSans-Bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
      }),
    ]);
  };

  const handleLoadingError = error => {
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
};
