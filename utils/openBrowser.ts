import * as WebBrowser from 'expo-web-browser';
import Colors from '../constants/Colors';
import logEvent from './logEvent';

export function openBrowser({ title, url }: { title: string; url: string }) {
  logEvent(`TAP ${title}`);
  WebBrowser.openBrowserAsync(url, {
    toolbarColor: Colors.darkestGray,
  }).catch((err: unknown) => {
    logEvent('ERROR with WebBrowser', { error: err });
    WebBrowser.dismissBrowser();
  });
}
