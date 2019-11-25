import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import * as Amplitude from 'expo-analytics-amplitude';
import MainTabNavigator from './MainTabNavigator';

// init with the dev app https://analytics.amplitude.com/echo-church-app-dev
Amplitude.initialize('14be0dcf73e2c3de7970ff1beca80824');

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
  })
);
