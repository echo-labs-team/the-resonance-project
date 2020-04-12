import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { Easing } from 'react-native-reanimated';
import { loop, bInterpolate } from 'react-native-redash';
import Colors from '../constants/Colors';
import { Subtitle } from './shared/Typography';

const { set, useCode, Value } = Animated;

function AnimatedCircle() {
  const animation = new Value(0);

  // loop the opacity
  // https://www.youtube.com/watch?v=1Q9efh7OcR8
  useCode(
    () =>
      set(
        animation,
        loop({
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          boomerang: true,
          autoStart: true,
        })
      ),
    [animation]
  );

  const opacity = bInterpolate(animation, 0.1, 1);

  return (
    <Animated.View style={{ opacity }}>
      <Svg style={styles.circle} viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="50" fill={Colors.red} fillOpacity="1" />
      </Svg>
    </Animated.View>
  );
}

export default ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Subtitle style={styles.liveText}>WATCH LIVE</Subtitle>
      <AnimatedCircle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkestGray,
  },
  liveText: {
    marginRight: 10,
    marginBottom: 0,
  },
  circle: {
    height: 20,
    width: 20,
  },
});
