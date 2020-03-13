/**
 * Text component that uses the correct font-family
 * and supports different font weights
 */

import React from 'react';
import { Text } from 'react-native';

export default props => {
  let fontSize = 16;

  let fontWeight = 'Regular';

  if (props.light) {
    fontWeight = 'Light';
  } else if (props.bold) {
    fontWeight = 'Bold';
  }

  if (props.XL) {
    fontSize = 30;
  } else if (props.L) {
    fontSize = 20;
  } else if (props.M) {
    fontSize = 18;
  } else if (props.S) {
    fontSize = 14;
  } else if (props.XS) {
    fontSize = 12;
  }

  return (
    <Text
      allowFontScaling={false}
      selectable
      {...props}
      style={[
        { fontSize, fontFamily: `NunitoSans-${fontWeight}` },
        props.style,
      ]}
    >
      {props.children}
    </Text>
  );
};
