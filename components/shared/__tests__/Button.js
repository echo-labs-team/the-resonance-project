import React from 'react';
import { View, Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('<Button/>', () => {
  test('render the button', async () => {
    const { toJSON } = render(<Button title="Button" />);

    expect(toJSON()).toMatchSnapshot();
  });

  test('render the button with style', async () => {
    const styles = { backgroundColor: 'black' };
    const { toJSON } = render(
      <Button title="Button" style={styles} textStyle={styles} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  test('render the button with an icon', async () => {
    const { toJSON } = render(
      <Button
        title="Button"
        icon={
          <View>
            <Text>Icon</Text>
          </View>
        }
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  test('render the button and press it', async () => {
    const mockPress = jest.fn();
    const { getByText } = render(<Button title="Button" onPress={mockPress} />);

    fireEvent.press(getByText('Button'));

    expect(mockPress).toBeCalled();
  });
});
