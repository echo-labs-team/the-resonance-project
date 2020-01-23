import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import GroupsError from '../GroupsError';

describe('<GroupsError/>', () => {
  test('render a group error', async () => {
    const { toJSON } = render(<GroupsError />);

    expect(toJSON()).toMatchSnapshot();
  });

  test('render a group error with a Try Again CTA', async () => {
    const mockTryAgain = jest.fn();
    const { toJSON, getByText } = render(
      <GroupsError tryAgain={mockTryAgain} />
    );

    expect(toJSON()).toMatchSnapshot();

    fireEvent.press(getByText('Try Again'));
    expect(mockTryAgain).toBeCalled();
  });
});
