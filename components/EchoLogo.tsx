import { StyleProp, ViewStyle } from 'react-native';
import Svg, { NumberProp, Polygon } from 'react-native-svg';
import { Color } from '../constants/Colors';

export default function EchoLogo({
  color,
  height,
  style,
  width,
}: {
  color: Color;
  height: NumberProp;
  style?: StyleProp<ViewStyle>;
  width: NumberProp;
}) {
  return (
    <Svg
      fill={color}
      height={height}
      style={style}
      viewBox="0 0 75.103 35.494"
      width={width}
    >
      <Polygon points="10.051,7.25 68.984,7.25 75.103,0 37.551,0 0,0 12.051,14.281" />
      <Polygon points="20.663,21.402 57.042,21.402 63.051,14.281 12.051,14.281 18.776,22.25 21.986,26.054" />
      <Polygon points="23.994,28.434 29.952,35.494 45.151,35.494 51.109,28.434" />
    </Svg>
  );
}
