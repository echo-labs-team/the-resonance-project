import React, { useState } from 'react';
import {
  AsyncStorage,
  Platform,
  StatusBar,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import * as Amplitude from 'expo-analytics-amplitude';
import AppNavigator from './navigation/AppNavigator';
import Colors from './constants/Colors';

if (__DEV__) {
  // override amplitude tracking
  Amplitude.logEventWithProperties = (name, data) =>
    console.log(`[amplitude]: ${name} -`, data);

  // Erase all AsyncStorage
  AsyncStorage.clear();
}

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default props => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/activate.png'),
        require('./assets/images/baptism.jpg'),
        require('./assets/images/volunteer.jpg'),
        require('./assets/images/pray.jpg'),
        require('./assets/images/missions.png'),
        require('./assets/images/connect_bg.png'),
        require('./assets/images/groups_bg.png'),
        require('./assets/images/giving_bg.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        'NunitoSans-Light': require('./assets/fonts/NunitoSans-Light.ttf'),
        'NunitoSans-Regular': require('./assets/fonts/NunitoSans-Regular.ttf'),
        'NunitoSans-Bold': require('./assets/fonts/NunitoSans-Bold.ttf'),
      }),
    ]);
  };

  const handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  const handleFinishLoading = () => setIsLoadingComplete(true);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={handleFinishLoading}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        hidden={true}
        animated
        barStyle="light-content"
        networkActivityIndicatorVisible
        showHideTransition="fade"
        translucent
      />
      <AppNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
});
