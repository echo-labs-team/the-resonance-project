import React from 'react';
import TextStyles from '../constants/TextStyles';
import Svg, { Circle } from 'react-native-svg';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Colors from '../constants/Colors';

export default ({ width, height, color, style }) => {
  return (
    <Animated.View style={[style, styles.container]}>
      <View style={{ flex: 1 }} />
      <Text style={styles.liveText}>WATCH LIVE</Text>
      <Svg style={styles.circle} viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="50"
          stroke="red"
          strokeWidth="1"
          fill="red"
        />
      </Svg>
      <View style={{ flex: 1 }} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  liveText: {
    ...TextStyles.subtitle,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingRight: 8,
  },
  circle: {
    height: TextStyles.subtitle.fontSize,
    width: TextStyles.subtitle.fontSize,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: Colors.darkestGray,
  },
});
