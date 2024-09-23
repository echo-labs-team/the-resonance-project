/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../storybook/CenterView';
import Colors from '../constants/Colors';
import LiveCard from './LiveCard';

storiesOf('Live Card', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <LiveCard style={styles.base} />)
  .add('with styles', () => (
    <LiveCard
      style={[styles.base, { backgroundColor: Colors.blue, borderRadius: 25 }]}
    />
  ));

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    height: '25%',
    width: '80%',
  },
});
