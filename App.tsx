import React, { useState, useEffect, useCallback } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { enableScreens } from 'react-native-screens';
import * as SplashScreen from 'expo-splash-screen';
import * as Sentry from 'sentry-expo';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Storybook from './storybook';
import {
  AppState,
  AppStateStatus,
  Platform,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Amplitude from 'expo-analytics-amplitude';
import { resources } from './resources';
import keys from './constants/Keys.json';
import logEvent from './utils/logEvent';
import AppNavigator from './navigation/AppNavigator';

const RUN_STORYBOOK = __DEV__ && false;

enableScreens();

// initialize Sentry and Amplitude
Sentry.init({
  dsn: keys.SENTRY_DSN,
  enableAutoSessionTracking: true,
  debug: __DEV__,
});

Amplitude.initializeAsync(keys.AMPLITUDE);

if (__DEV__) {
  setLogger({
    log: console.log,
    warn: console.warn,
    error: console.error,
  });
} else {
  setLogger({
    log: (message) => {
      Sentry.Native.captureMessage(message);
    },
    warn: (message) => {
      Sentry.Native.captureMessage(message);
    },
    error: (error) => {
      Sentry.Native.captureException(error);
    },
  });
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const queryClient = new QueryClient();

function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // preload resources
        await Promise.all(resources);
      } catch (err) {
        logEvent('ERROR: preparing app', { error: err });
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  /**
   * Log when our app
   * becomes active (The app is running in the foreground)
   * or runs in the background (The user is either: in another app, on the home screen,
   * or [Android-only] on another Activity, even if it was launched by the app)
   * https://reactnative.dev/docs/appstate
   */
  useEffect(() => {
    function handleAppStateChange(state: AppStateStatus) {
      if (state === 'active') {
        queryClient.invalidateQueries();
        logEvent('Start session');
      }
      if (state === 'background') {
        logEvent('End session');
      }
    }

    AppState.addEventListener('change', handleAppStateChange);

    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar
          hidden
          animated
          style="light"
          networkActivityIndicatorVisible
          translucent
        />
        <View style={styles.container} onLayout={onLayoutRootView}>
          <AppNavigator />
        </View>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default RUN_STORYBOOK ? Storybook : App;
