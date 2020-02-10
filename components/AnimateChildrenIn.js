// @flow
import React, { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';
import { Transitioning, Transition } from 'react-native-reanimated';

export default ({
  children = {},
  type = 'slide-top',
  durationMs = 500,
  delayMs = 0,
  ...otherProps
}: {
  children: Object,
  type?: string,
  durationMs?: number,
  delayMs?: number,
}) => {
  const [loaded, setLoaded] = useState(false);
  const ref: { current: Object } = useRef();

  useEffect(() => {
    ref.current.animateNextTransition();
    setLoaded(true);
  }, []);

  const transition = (
    <Transition.Together>
      <Transition.In
        type={type}
        durationMs={durationMs}
        delayMs={delayMs}
        interpolation="easeInOut"
        propagation="top"
      />
      <Transition.In type="fade" durationMs={durationMs} delayMs={delayMs} />
    </Transition.Together>
  );

  return (
    <Transitioning.View ref={ref} transition={transition}>
      {/* $FlowFixMe to ignore ...otherProps */}
      <View key={loaded} {...otherProps}>
        {children}
      </View>
    </Transitioning.View>
  );
};
