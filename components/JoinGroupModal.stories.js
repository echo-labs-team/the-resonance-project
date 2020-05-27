/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../storybook/CenterView';
import JoinGroupModal from './JoinGroupModal';

storiesOf('Join Group Form', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <JoinGroupModal
      groupID="group-id"
      title="Alpha"
      showSuccess={(message) => console.log(message)}
    />
  ));
