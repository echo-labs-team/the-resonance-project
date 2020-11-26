import Amplitude from 'amplitude-js';

export default function logEvent(name, data) {
  // override amplitude tracking
  if (__DEV__) {
    console.log(`[amplitude]: ${name}\n`);

    if (data) {
      console.log('data:', JSON.stringify(data, null, 2));
    }
  } else {
    Amplitude.getInstance().logEvent(name, data);
  }
}
