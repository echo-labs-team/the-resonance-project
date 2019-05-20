import React from 'react'
import { Text, View } from 'react-native';
import { styles } from './Styles'

export class GivingScreen extends React.Component {
  render() {
    return (
      <View style={styles.defaultScreen}>
        <Text>Giving!</Text>
      </View>
    );
  }
}