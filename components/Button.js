import React, { Component } from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';
import Colors from '../constants/Colors';

export default class Button extends Component {
  render() {
    return (
      <TouchableHighlight
        style={[styles.button, this.props.style]}
        onPress={this.props.onPress}
        underlayColor={Colors.blue}
      >
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.title.toUpperCase()}
        </Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: Colors.darkBlue,
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: 16,
  },
});
