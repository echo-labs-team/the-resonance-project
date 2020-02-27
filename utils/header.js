// @flow

import { Platform } from 'react-native';
import { Header } from 'react-navigation-stack';

// $FlowIgnore: we will remove the HEIGHT static soon enough
const BASE_HEADER_HEIGHT = Header.HEIGHT;

const HEADER_HEIGHT =
  Platform.OS === 'ios' ? BASE_HEADER_HEIGHT : BASE_HEADER_HEIGHT + 4;

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
