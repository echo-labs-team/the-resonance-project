import React, { useState, useEffect, useCallback, useRef } from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { enableScreens } from 'react-native-screens';
import * as SplashScreen from 'expo-splash-screen';
import { useTrackingPermissions } from 'expo-tracking-transparency';
import * as Sentry from 'sentry-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Storybook from './storybook';
import { AppState, Platform, StyleSheet, UIManager, View } from 'react-native';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import * as Amplitude from 'expo-analytics-amplitude';
import { resources } from './resources';
import logEvent from './utils/logEvent';
import AppNavigator from './navigation/AppNavigator';

const RUN_STORYBOOK = __DEV__ && false;

enableScreens();

// initialize Sentry and Amplitude
Sentry.init({
  dsn: Constants.manifest?.extra?.SENTRY_DSN,
  enableAutoSessionTracking: true,
  debug: __DEV__,
});

if (Constants.manifest?.extra?.AMPLITUDE) {
  Amplitude.initializeAsync(Constants.manifest.extra.AMPLITUDE);
}

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
  const appState = useRef(AppState.currentState);
  const [appIsReady, setAppIsReady] = useState(false);
  const [status, requestPermission] = useTrackingPermissions();

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

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        queryClient.invalidateQueries();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();

      if (!status?.granted) {
        setTimeout(async () => {
          await requestPermission();
        }, 500);
      }
    }
  }, [appIsReady, requestPermission, status?.granted]);

  if (!appIsReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
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
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default RUN_STORYBOOK ? Storybook : App;
