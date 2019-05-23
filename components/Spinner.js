import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';

export default class Spinner extends Component {
  render() {
    return (
      <ActivityIndicator
        size="large"
        color="#4294CC"
        style={{ flex: 1, alignSelf: 'center' }}
      />
    );
  }
}
