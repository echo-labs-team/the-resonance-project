import React from 'react';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import Colors from '../constants/Colors';

export default () => (
  <Placeholder
    Animation={props => (
      <Fade {...props} style={{ backgroundColor: Colors.darkGray }} />
    )}
    style={{ padding: 20 }}
  >
    <PlaceholderLine
      width={70}
      height={40}
      style={{ backgroundColor: Colors.darkestGray }}
    />
    <PlaceholderLine style={{ backgroundColor: Colors.darkestGray }} />
    <PlaceholderLine
      width={40}
      style={{ marginBottom: 24, backgroundColor: Colors.darkestGray }}
    />
    <PlaceholderLine
      width={80}
      style={{ backgroundColor: Colors.darkestGray }}
    />
    <PlaceholderLine
      width={70}
      style={{ backgroundColor: Colors.darkestGray }}
    />
    <PlaceholderLine
      width={80}
      style={{ backgroundColor: Colors.darkestGray }}
    />
    <PlaceholderLine
      width={70}
      style={{ backgroundColor: Colors.darkestGray }}
    />
    <PlaceholderLine
      width={60}
      style={{ backgroundColor: Colors.darkestGray }}
    />
  </Placeholder>
);
