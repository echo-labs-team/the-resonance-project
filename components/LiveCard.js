import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated from 'react-native-reanimated';
import Colors from '../constants/Colors';
import Text from '../components/Text';

const {
  block,
  Clock,
  clockRunning,
  cond,
  set,
  spring,
  startClock,
  stopClock,
  Value,
} = Animated;

function runSpring(clock, value, dest) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    damping: 3,
    mass: 2,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.1,
    restDisplacementThreshold: 0.1,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, 4),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, [
      // loop the animation
      stopClock(clock),
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, 4),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    state.position,
  ]);
}

function AnimatedCircle() {
  const clock = new Clock();
  const scale = runSpring(clock, 1, 1);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Svg style={styles.circle} viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="50" fill={Colors.red} fillOpacity="1" />
      </Svg>
    </Animated.View>
  );
}

export default ({ style }) => {
  return (
    <View style={[style, styles.container]}>
      <Text style={styles.liveText}>WATCH LIVE</Text>
      <AnimatedCircle />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkestGray,
  },
  liveText: {
    marginRight: 16,
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: Colors.white,
  },
  circle: {
    height: 20,
    width: 20,
  },
});
