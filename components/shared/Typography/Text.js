/* eslint-disable react-native/no-inline-styles */
/**
 * Text component that uses the correct font-family
 * and supports different font weights
 */

import React from 'react';
import { Text as RNText } from 'react-native';
import Colors from '../../../constants/Colors';

function getFontRhythm(props) {
  if (props.XXL) {
    return { fontSize: 30, lineHeight: 40 };
  }
  if (props.XL) {
    return { fontSize: 28, lineHeight: 34 };
  }
  if (props.L) {
    return { fontSize: 22, lineHeight: 28 };
  }
  if (props.M) {
    return { fontSize: 18, lineHeight: 24 };
  }
  if (props.S) {
    return { fontSize: 16, lineHeight: 20 };
  }
  if (props.XS) {
    return { fontSize: 14, lineHeight: 16 };
  }

  // the base font size
  return { fontSize: 18, lineHeight: 24 };
}

export function Text(props) {
  const fontRhythm = getFontRhythm(props);

  let fontWeight = 'Regular';

  if (props.light) {
    fontWeight = 'Light';
  } else if (props.bold) {
    fontWeight = 'Bold';
  }

  return (
    <RNText
      selectable
      {...props}
      style={[
        {
          fontFamily: `NunitoSans-${fontWeight}`,
          textAlign: props.center ? 'center' : 'auto',
          color: Colors.lightGray, // ! use theme to determine this
          ...fontRhythm,
        },
        props.style,
      ]}
    >
      {props.children}
    </RNText>
  );
}
