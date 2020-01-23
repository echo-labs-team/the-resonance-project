import React from 'react';
import { TouchableHighlight } from 'react-native';
import { render, fireEvent } from 'react-native-testing-library';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import GroupCardDetails from '../GroupCardDetails';

describe('<GroupCardDetails/>', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  test('render the group details', async () => {
    const mockNavigate = jest.fn();
    const props = {
      navigation: { navigate: mockNavigate },
      item: {
        name: '01 - Test Group',
        campus: 'North San Jose',
        frequency: 1,
        interval: 'Weekly',
        daysOfWeek: ['Tuesday'],
        dayOfMonth: '',
        meetingTime: '19:00:00 PST',
        description: 'This group is a test',
      },
    };
    const { toJSON, getByType } = render(<GroupCardDetails {...props} />);

    expect(toJSON()).toMatchSnapshot();

    fireEvent.press(getByType(TouchableHighlight));

    expect(mockNavigate).toBeCalledWith('GroupDetails', {
      group: { ...props.item, title: 'Test Group' },
    });
  });
});
