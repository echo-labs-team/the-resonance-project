import React from 'react';
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
        Name: 'Test Group',
        GroupCampus: 'North San Jose',
        FriendlyScheduleText: 'Weekly: Tuesdays at 7:00 PM',
        Description: 'This group is a test',
      },
    };
    const { toJSON, getByTestId } = render(<GroupCardDetails {...props} />);

    expect(toJSON()).toMatchSnapshot();

    fireEvent.press(getByTestId('GroupCardDetails'));

    expect(mockNavigate).toBeCalledWith('GroupDetails', {
      group: { ...props.item },
    });
  });
});
