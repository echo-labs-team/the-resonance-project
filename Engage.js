import React from 'react'
import { Text, View } from 'react-native';
import { styles } from './Styles'


export class EngageScreen extends React.Component {
  render() {
    return (
      <View style={styles.defaultScreen}>
        <Text>Engage!</Text>
      </View>
    );
  }
}