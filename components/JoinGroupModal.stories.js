import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../storybook/CenterView';
import JoinGroupModal from './JoinGroupModal';

storiesOf('Join Group Form', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <JoinGroupModal
      groupID="group-id"
      showSuccess={(message) => console.log(message)}
      title="Alpha"
    />
  ));
