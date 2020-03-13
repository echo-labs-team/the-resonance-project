import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { Easing } from 'react-native-reanimated';
import { loop, bInterpolate } from 'react-native-redash';
import Colors from '../constants/Colors';
import TextStyles from '../constants/TextStyles';
import Text from './shared/Text';

const { block, set, useCode, Value } = Animated;

function AnimatedCircle() {
  const animation = new Value(0);

  // loop the opacity
  // https://www.youtube.com/watch?v=1Q9efh7OcR8
  useCode(
    () =>
      block([
        set(
          animation,
          loop({
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            boomerang: true,
            autoStart: true,
          })
        ),
      ]),
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
    <View style={[style, styles.container]}>
      <Text L style={[TextStyles.title, styles.liveText]}>
        WATCH LIVE
      </Text>
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
    marginRight: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  circle: {
    height: 20,
    width: 20,
  },
});
