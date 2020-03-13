import React from 'react';
import { StyleSheet, View } from 'react-native';
import Colors from '../constants/Colors';
import Text from './shared/Text';

export default ({ isOnline = false, location: { name, description } = {} }) => (
  <View style={{ marginBottom: 16 }}>
    <Text bold style={{ fontSize: 18, color: Colors.gray }}>
      Location
    </Text>
    {isOnline && (
      <Text style={{ fontSize: 16, color: Colors.gray }}>Online</Text>
    )}
    {!isOnline && (
      <>
        <Text style={{ fontSize: 16, color: Colors.gray }}>{name}</Text>
        {description && (
          <Text style={{ marginTop: 10, fontSize: 16, color: Colors.gray }}>
            {description}
          </Text>
        )}
      </>
    )}
  </View>
);
