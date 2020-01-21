import React from 'react';
import { render } from 'react-native-testing-library';
import GroupLocation from '../GroupLocation';

describe('<GroupLocation/>', () => {
  test('render a group with a location', async () => {
    const { toJSON } = render(
      <GroupLocation
        isOnline={false}
        location={{
          name: 'Starbucks',
          description: 'Table in the back with all the coffee',
        }}
      />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  test('render a group with a location, but no description', async () => {
    const { toJSON } = render(
      <GroupLocation isOnline={false} location={{ name: 'Starbucks' }} />
    );

    expect(toJSON()).toMatchSnapshot();
  });

  test('render an online group', async () => {
    const { toJSON } = render(<GroupLocation isOnline />);

    expect(toJSON()).toMatchSnapshot();
  });
});
