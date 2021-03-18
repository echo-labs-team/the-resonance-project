/**
 * Custom hook to handle tab changes by getting if a
 * tab is focused. Call this hook from each main tab.
 */

import React from 'react';
import { setStatusBarHidden } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import logEvent from '../utils/logEvent';

export default (tab) => {
  const shouldHideStatusBar = tab === 'Home';

  useFocusEffect(
    React.useCallback(() => {
      setStatusBarHidden(shouldHideStatusBar, 'fade');
      logEvent(`PAGEVIEW ${tab} tab`);
    }, [])
  );
};
