import React, { useState, useEffect } from 'react';
import {
  AppState,
  Platform,
  StatusBar,
  TouchableHighlight,
  UIManager,
} from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { enableScreens } from 'react-native-screens';
import * as SplashScreen from 'expo-splash-screen';
import * as Sentry from '@sentry/react-native';
import Amplitude from 'amplitude-js';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import OneSignal from 'react-native-onesignal';
import resources from './resources';
import keys from './constants/Keys';
import logEvent from './utils/logEvent';
import AppNavigator from './navigation/AppNavigator';
import Storybook from './storybook';

enableScreens();

// initialize Sentry and Amplitude
Sentry.init({ dsn: keys.SENTRY_DSN, enableNative: false });
Amplitude.getInstance().init(keys.AMPLITUDE, null, { platform: 'Mobile' });

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const queryClient = new QueryClient();

function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [showStorybook, setShowStorybook] = useState(false);

  if (!__DEV__) {
    OneSignal.init(keys.ONESIGNAL_APP_ID, {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });

    // Controls what should happen if a notification is received while the app is open. 2 means that the notification will
    // go directly to the device's notification center.
    OneSignal.inFocusDisplaying(2);

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the
    // following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse((permission) =>
      logEvent(`${permission ? 'Allowed' : 'Disallowed'} push notifications`)
    );
  }

  /**
   * Log when our app
   * becomes active (The app is running in the foreground)
   * or runs in the background (The user is either: in another app, on the home screen,
   * or [Android-only] on another Activity, even if it was launched by the app)
   * https://reactnative.dev/docs/appstate
   */
  useEffect(() => {
    const loadResourcesAsync = async () => {
      return Promise.all(resources).then(() => {
        setIsLoadingComplete(true);
      });
    };

    SplashScreen.preventAutoHideAsync().catch((err) => console.warn(err));
    loadResourcesAsync().then(() => {
      setIsLoadingComplete(true);
      SplashScreen.hideAsync();
    });

    const handleAppStateChange = (state) => {
      if (state === 'active') {
        logEvent('Start session');
      }
      if (state === 'background') {
        logEvent('End session');
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, []);

  if (!isLoadingComplete) {
    return null;
  }

  if (__DEV__ && showStorybook) {
    return <Storybook />;
  }

  return (
    <QueryClientProvider client={queryClient}>
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

        {/* Button to show the Storybook 📖 */}
        {__DEV__ && (
          <TouchableHighlight
            underlayColor="#ce2f1c"
            onPress={() => setShowStorybook(true)}
            // eslint-disable-next-line
            style={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 100,
              right: 20,
              borderRadius: 25,
              backgroundColor: '#1f6276',
            }}
          >
            <Entypo
              name={'book'}
              size={30}
              color="#fff"
              // eslint-disable-next-line
              style={{ marginTop: 4 }}
            />
          </TouchableHighlight>
        )}
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
