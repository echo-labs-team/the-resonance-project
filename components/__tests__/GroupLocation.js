import React from 'react';
import { render } from '@testing-library/react-native';
import GroupLocation from '../GroupLocation';

describe('<GroupLocation/>', () => {
  test('render a group with a location', async () => {
    const { toJSON } = render(
      <GroupLocation isOnline={false} city="San Jose" />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  test('render a group with a location, but no description', async () => {
    const { toJSON } = render(
      <GroupLocation isOnline={false} city="Sunnyvale" />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  test('render an online group', async () => {
    const { toJSON } = render(<GroupLocation isOnline />);

    expect(toJSON()).toMatchSnapshot();
  });
});
