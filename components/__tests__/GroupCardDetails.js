import React from 'react';
import { TouchableHighlight } from 'react-native';
import { render, fireEvent } from 'react-native-testing-library';
import { useNavigation } from '@react-navigation/native';
import GroupCardDetails from '../GroupCardDetails';

// mock react-navigation
jest.mock('@react-navigation/native');

describe('<GroupCardDetails/>', () => {
  test('render the group details', async () => {
    const mockNavigate = jest.fn();

    // mock the `useNavigation` hook
    useNavigation.mockReturnValue({ navigate: mockNavigate });

    const props = {
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
