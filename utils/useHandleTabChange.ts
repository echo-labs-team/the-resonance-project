/**
 * Custom hook to handle tab changes by getting if a
 * tab is focused. Call this hook from each main tab.
 */

import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import logEvent from './logEvent';

export function useHandleTabChange(tab: string) {
  useFocusEffect(
    React.useCallback(() => {
      logEvent(`PAGEVIEW ${tab} tab`);
    }, [tab])
  );
}
