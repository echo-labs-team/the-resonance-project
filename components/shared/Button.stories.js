/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CenterView from '../../storybook/CenterView';
import Colors from '../../constants/Colors';
import Button from './Button';

storiesOf('Button', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <Button title="Button" />)
  .add('with styles', () => (
    <Button title="Button" style={{ backgroundColor: Colors.red }} />
  ))
  .add('with text styles (textiles 😂)', () => (
    <Button
      title="Button"
      textStyle={{
        fontSize: 26,
        lineHeight: 34, // need to define `lineHeight` if we specify `fontSize`
        fontWeight: 'bold',
        color: Colors.red,
      }}
    />
  ))
  .add('with long text', () => (
    <Button
      title="Cillum sunt amet et cupidatat reprehenderit pariatur aliqua aliquip consequat tempor excepteur."
      textStyle={{ fontSize: 22, lineHeight: 28 }}
    />
  ))
  .add('with icon', () => (
    <Button
      icon={
        <MaterialCommunityIcons name={'fire'} size={30} color={Colors.red} />
      }
      title="Button"
    />
  ));
