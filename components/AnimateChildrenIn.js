import React, { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';
import { Transitioning, Transition } from 'react-native-reanimated';

export default ({ children = {} }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef();

  useEffect(() => {
    ref.current.animateNextTransition();
    setLoaded(true);
  }, []);

  const transition = (
    <Transition.Together>
      <Transition.In
        type="slide-top"
        durationMs={500}
        interpolation="easeInOut"
        propagation="top"
      />
      <Transition.In type="fade" durationMs={500} />
    </Transition.Together>
  );

  return (
    <Transitioning.View ref={ref} transition={transition}>
      <View key={loaded}>{children}</View>
    </Transitioning.View>
  );
};
