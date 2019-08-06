import React from 'react';
import { View } from 'react-native';
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import Colors from '../constants/Colors';

export default () => (
  <Placeholder
    Animation={props => (
      <Fade {...props} style={{ backgroundColor: Colors.darkGray }} />
    )}
    style={{
      borderRadius: 8,
      backgroundColor: Colors.darkestGray,
      overflow: 'hidden',
    }}
  >
    <PlaceholderLine
      width="100%"
      style={{
        height: 200,
        backgroundColor: Colors.darkestGray,
        borderRadius: 0,
      }}
    />
    <View style={{ padding: 10 }}>
      <PlaceholderLine
        width={20}
        style={{ backgroundColor: Colors.darkestGray }}
      />
      <PlaceholderLine
        width="80%"
        style={{
          marginTop: 4,
          backgroundColor: Colors.darkestGray,
        }}
      />
      <PlaceholderLine
        width="50%"
        style={{
          marginTop: 4,
          backgroundColor: Colors.darkestGray,
        }}
      />
      <PlaceholderLine
        width="100%"
        style={{
          marginTop: 4,
          backgroundColor: Colors.darkestGray,
        }}
      />
      <PlaceholderLine
        width="100%"
        style={{ backgroundColor: Colors.darkestGray }}
      />
      <PlaceholderLine
        width="100%"
        style={{ marginBottom: 0, backgroundColor: Colors.darkestGray }}
      />
    </View>
  </Placeholder>
);
