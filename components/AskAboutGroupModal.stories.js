import React from 'react';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../storybook/CenterView';
import AskAboutGroupModal from './AskAboutGroupModal';

storiesOf('Ask About Group Form', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('default', () => (
    <AskAboutGroupModal
      groupID="group-id"
      showSuccess={(message) => console.log(message)}
      title="Alpha"
    />
  ));
