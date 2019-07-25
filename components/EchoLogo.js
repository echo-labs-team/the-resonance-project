import React from 'react';
import * as Svg from 'react-native-svg';

export default ({ width, height, color, style }) => {
  return (
    <Svg.Svg
      width={width}
      height={height}
      viewBox="0 0 75.103 35.494"
      fill={color}
      style={style}
    >
      <Svg.Polygon points="10.051,7.25 68.984,7.25 75.103,0 37.551,0 0,0 12.051,14.281" />
      <Svg.Polygon points="20.663,21.402 57.042,21.402 63.051,14.281 12.051,14.281 18.776,22.25 21.986,26.054" />
      <Svg.Polygon points="23.994,28.434 29.952,35.494 45.151,35.494 51.109,28.434" />
    </Svg.Svg>
  );
};
