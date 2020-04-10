/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CenterView from './CenterView';
import Colors from '../../constants/Colors';
import Button from '../../components/shared/Button';
import Spinner from '../../components/shared/Spinner';

storiesOf('Button', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <Button title="Button" />)
  .add('with styles', () => (
    <Button title="Button" style={{ backgroundColor: Colors.red }} />
  ))
  .add('with text styles (textiles 😂)', () => (
    <Button
      title="Button"
      textStyle={{ fontSize: 26, fontWeight: 'bold', color: Colors.red }}
    />
  ))
  .add('with long text', () => (
    <Button title="Proident voluptate qui anim eiusmod in tempor labore." />
  ))
  .add('with icon', () => (
    <Button
      icon={
        <MaterialCommunityIcons name={'fire'} size={30} color={Colors.red} />
      }
      title="Button"
    />
  ));

storiesOf('Spinner', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <Spinner />)
  .add('with different color', () => (
    <Spinner
      spinnerColor={Colors.blue}
      style={{ backgroundColor: Colors.red }}
    />
  ));
