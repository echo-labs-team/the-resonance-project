/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import CenterView from '../../storybook/CenterView';
import Checkbox from './Checkbox';

function InteractiveCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <TouchableHighlight
      underlayColor="transparent"
      onPress={() => {
        setChecked(!checked);
      }}
    >
      <Checkbox checked={checked} />
    </TouchableHighlight>
  );
}

storiesOf('Checkbox', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('unchecked', () => <Checkbox />)
  .add('checked', () => <Checkbox checked />)
  .add('interactive', () => <InteractiveCheckbox />);
