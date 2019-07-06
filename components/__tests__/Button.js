import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import Button from '../Button';

describe('App snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the button', async () => {
    const tree = renderer.create(<Button title="Button" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
