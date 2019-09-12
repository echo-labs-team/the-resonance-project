// @flow

import { Platform } from 'react-native';
import { Header } from 'react-navigation-stack';
import { ifIphoneX } from 'react-native-iphone-x-helper';

/**
 * This gets the inset styling that's needed for a `ScrollView` or a component
 * that inherits from `ScrollView`, which compensates for a transparent header
 *
 * https://github.com/react-navigation/react-navigation/blob/master/examples/NavigationPlayground/src/StackWithTranslucentHeader.tsx
 *
 * Usage: just spread this into the `ScrollView` or `FlatList` or `SectionList`
 *
 * @example {...getHeaderInset()}
 */
export function getHeaderInset(): any {
  const NOTCH_HEIGHT = ifIphoneX() ? 25 : 0;

  // $FlowIgnore: we will remove the HEIGHT static soon enough
  const BASE_HEADER_HEIGHT = Header.HEIGHT + 20; // add 20 extra padding

  const HEADER_HEIGHT =
    Platform.OS === 'ios'
      ? BASE_HEADER_HEIGHT + NOTCH_HEIGHT
      : BASE_HEADER_HEIGHT + 20;

  return Platform.select({
    android: {
      contentContainerStyle: {
        paddingTop: HEADER_HEIGHT,
      },
    },
    ios: {
      contentInset: { top: HEADER_HEIGHT },
      contentOffset: { y: -HEADER_HEIGHT },
    },
  });
}
