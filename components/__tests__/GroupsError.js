import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GroupsError from '../GroupsError';

describe('<GroupsError/>', () => {
  test('render a group error with a Try Again CTA', async () => {
    const mockTryAgain = jest.fn();
    const { getByText } = render(<GroupsError tryAgain={mockTryAgain} />);

    fireEvent.press(getByText('Try Again'));
    expect(mockTryAgain).toBeCalled();
  });
});
