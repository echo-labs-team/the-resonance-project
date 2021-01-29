import Amplitude from 'amplitude-js';
import * as Sentry from '@sentry/react-native';

export default function logEvent(name, data) {
  // override amplitude tracking
  if (__DEV__) {
    console.log(`[amplitude]: ${name}\n`);

    if (data) {
      console.log('data:', JSON.stringify(data, null, 2));
    }
  } else {
    Amplitude.getInstance().logEvent(name, data);

    if (name.toLowerCase().includes('error')) {
      Sentry.captureException(data?.error || { message: name });
    }
  }
}
