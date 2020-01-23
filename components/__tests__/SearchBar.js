import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import SearchBar from '../SearchBar';

describe('<SearchBar/>', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  test('render the default search bar', async () => {
    const { toJSON } = render(<SearchBar />);

    expect(toJSON()).toMatchSnapshot();
  });

  test('render the search bar with a value', async () => {
    const { toJSON } = render(<SearchBar value="Alpha" />);

    expect(toJSON()).toMatchSnapshot();
  });

  test('change the search bar input', async () => {
    const mockChangeText = jest.fn();

    const { getByTestId } = render(<SearchBar onChangeText={mockChangeText} />);

    fireEvent.changeText(getByTestId('search-bar-input'), 'Alpha');

    expect(mockChangeText).toBeCalledWith('Alpha');
  });
});
