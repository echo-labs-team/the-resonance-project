/**
 * Custom hook to handle tab changes by getting if a
 * tab is focused. Call this hook from each main tab.
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Amplitude from 'expo-analytics-amplitude';

export default (tab) => {
  useFocusEffect(
    React.useCallback(() => {
      Amplitude.logEvent(`PAGEVIEW ${tab} tab`);
      StatusBar.setHidden(tab === 'Home', 'fade');
    }, [])
  );
};
