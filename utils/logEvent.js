import { Constants } from 'expo-constants';
import Amplitude from 'amplitude-js';

const channel = Constants?.manifest?.releaseChannel;

export default function logEvent(name, data) {
  // override amplitude tracking
  if (__DEV__) {
    console.log(`[amplitude]: ${name}\n`);
    return data && console.log('data:', JSON.stringify(data, null, 2));
  }

  // beta testing from the store--we want to log this to amplitude, but separate it out
  if (channel.indexOf('develop') !== -1) {
    return Amplitude.getInstance().logEvent(`BETA ${name}`, data);
  }

  Amplitude.getInstance().logEvent(name, data);
}
