import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Colors from '../constants/Colors';
import { Subtitle } from './shared/Typography';

function AnimatedCircle() {
  const opacity = useSharedValue(0);

  // set opacity value to animate between 0 and 1
  opacity.value = withRepeat(
    withTiming(1, { duration: 1000, easing: Easing.ease }),
    -1,
    true
  );

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }), []);

  return (
    <Animated.View style={style}>
      <Svg style={styles.circle} viewBox="0 0 100 100">
        <Circle cx="50" cy="50" fill={Colors.red} fillOpacity="1" r="50" />
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
  circle: {
    height: 20,
    width: 20,
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.darkestGray,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  liveText: {
    marginBottom: 0,
    marginRight: 10,
  },
});
