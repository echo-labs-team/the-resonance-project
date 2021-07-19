import * as Amplitude from 'expo-analytics-amplitude';
import * as Sentry from 'sentry-expo';

export default function logEvent(name, data) {
  // override amplitude tracking
  if (__DEV__) {
    console.log(`[amplitude]: ${name}\n`);

    if (data) {
      console.log('data:', JSON.stringify(data, null, 2));
    }
  } else {
    if (Amplitude) {
      Amplitude.logEventWithPropertiesAsync(name, data);
    }

    if (name.toLowerCase().includes('error')) {
      Sentry.captureException(data?.error || new Error(name));
    }
  }
}
