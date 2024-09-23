import * as Amplitude from 'expo-analytics-amplitude';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useTrackingPermissions } from 'expo-tracking-transparency';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Platform, StyleSheet, UIManager, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import * as Sentry from 'sentry-expo';
import AppNavigator from './navigation/AppNavigator';
import { resources } from './resources';
import Storybook from './storybook';
import logEvent from './utils/logEvent';

const RUN_STORYBOOK = __DEV__ && false;

enableScreens();

// initialize Sentry and Amplitude
Sentry.init({
  debug: __DEV__,
  dsn: Constants.manifest?.extra?.SENTRY_DSN as string,
  enableAutoSessionTracking: true,
});

if (Constants.manifest?.extra?.AMPLITUDE) {
  void Amplitude.initializeAsync(Constants.manifest.extra.AMPLITUDE as string);
}

if (__DEV__) {
  setLogger({
    error: console.error,
    log: console.log,
    warn: console.warn,
  });
} else {
  setLogger({
    error: (error) => {
      Sentry.Native.captureException(error);
    },
    log: (message: string) => {
      Sentry.Native.captureMessage(message);
    },
    warn: (message: string) => {
      Sentry.Native.captureMessage(message);
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

    void prepare();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        void queryClient.invalidateQueries();
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
        setTimeout(() => {
          void requestPermission();
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
            animated
            networkActivityIndicatorVisible
            style="light"
            translucent
          />
          <View onLayout={onLayoutRootView} style={styles.container}>
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
