/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../storybook/CenterView';
import Colors from '../../constants/Colors';
import Spinner from './Spinner';

storiesOf('Spinner', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => <Spinner />)
  .add('with different color', () => (
    <Spinner
      spinnerColor={Colors.blue}
      style={{ backgroundColor: Colors.red }}
    />
  ));
