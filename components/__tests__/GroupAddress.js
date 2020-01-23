import React from 'react';
import { render } from 'react-native-testing-library';
import GroupAddress from '../GroupAddress';

describe('<GroupAddress/>', () => {
  test('render group address', async () => {
    const location = {
      address: {
        address1: '1180 Murphy Ave',
        city: 'San Jose',
        postalCode: '95131',
        stProvince: 'CA',
      },
    };
    const { toJSON } = render(<GroupAddress location={location} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
