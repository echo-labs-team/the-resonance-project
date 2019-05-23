import React, { Component } from 'react';
import { Svg } from 'expo';

const { Polygon } = Svg;

export default class Logo extends Component {
  render() {
    const { width, height, color, style } = this.props;

    return (
      <Svg
        x="0px"
        y="0px"
        width={width}
        height={height}
        viewBox="0 0 75.103 35.494"
        fill={color}
        style={style}
      >
        <Polygon points="10.051,7.25 68.984,7.25 75.103,0 37.551,0 0,0 12.051,14.281" />
        <Polygon points="20.663,21.402 57.042,21.402 63.051,14.281 12.051,14.281 18.776,22.25 21.986,26.054" />
        <Polygon points="23.994,28.434 29.952,35.494 45.151,35.494 51.109,28.434" />
      </Svg>
    );
  }
}
