import React from 'react';
import { View, Text } from 'react-native';
import {
  flushMicrotasksQueue,
  render,
  fireEvent,
} from 'react-native-testing-library';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import ModalSheet from '../ModalSheet';

describe('<ModalSheet/>', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  test('render the modal sheet with defaults', async () => {
    const { toJSON } = render(<ModalSheet />);

    expect(toJSON()).toMatchSnapshot();
  });

  test('render the modal sheet and close on success', async () => {
    const { update, toJSON, getByText } = render(
      <ModalSheet buttonTitle="Join Group">
        <View>
          <Text>Join Echo Group</Text>
        </View>
      </ModalSheet>
    );

    expect(toJSON()).toMatchSnapshot();

    fireEvent.press(getByText('Join Group'));

    expect(toJSON()).toMatchSnapshot();

    // update ModalSheet with `success` prop
    update(
      <ModalSheet buttonTitle="Join Group" success>
        <View>
          <Text>Join Echo Group</Text>
        </View>
      </ModalSheet>
    );

    // wait for the modal to close
    await flushMicrotasksQueue();

    expect(toJSON()).toMatchSnapshot();
  });
});