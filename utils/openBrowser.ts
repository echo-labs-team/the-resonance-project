import * as WebBrowser from 'expo-web-browser';
import logEvent from './logEvent';
import Colors from '../constants/Colors';

export function openBrowser({ title, url }: { title: string; url: string }) {
  logEvent(`TAP ${title}`);
  WebBrowser.openBrowserAsync(url, {
    toolbarColor: Colors.darkestGray,
  }).catch((err) => {
    logEvent('ERROR with WebBrowser', { error: err });
    WebBrowser.dismissBrowser();
  });
}
