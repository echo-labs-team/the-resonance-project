/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../storybook/CenterView';
import ErrorFallback from './ErrorFallback';

storiesOf('ErrorFallback', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <ErrorFallback
      resetErrorBoundary={() => console.log('reset error boundary')}
    />
  ));
