import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Svg from 'react-native-svg';
import Colors from '../../constants/Colors';

const { Path } = Svg;

export default ({ checked = false }) => {
  return (
    <View
      style={[
        styles.box,
        { backgroundColor: checked ? Colors.gray : 'transparent' },
      ]}
    >
      <Svg.Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        {checked && (
          <Path
            strokeWidth={3}
            stroke={Colors.darkerGray}
            strokeMiterlimit={10}
            strokeDashoffset={40}
            d="M22.9 3.7l-15.2 16.6-6.6-7.1"
          />
        )}
      </Svg.Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: 2,
    position: 'relative',
    zIndex: 1,
    borderWidth: 2,
    borderColor: Colors.gray,
    borderRadius: 4,
  },
});
