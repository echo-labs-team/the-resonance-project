/**
 * Text component that uses the correct font-family
 * and supports different font weights
 */

import React from 'react';
import { Text } from 'react-native';

export default props => {
  let fontWeight = 'Regular';

  if (props.light) {
    fontWeight = 'Light';
  } else if (props.bold) {
    fontWeight = 'Bold';
  }

  return (
    <Text
      {...props}
      allowFontScaling={false}
      style={[{ fontFamily: `NunitoSans-${fontWeight}` }, props.style]}
    >
      {props.children}
    </Text>
  );
};
