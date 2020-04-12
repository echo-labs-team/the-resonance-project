import React from 'react';
import { render } from 'react-native-testing-library';
import Checkbox from '../Checkbox';

describe('<Checkbox/>', () => {
  test('render an unchecked checkbox by default', async () => {
    const { toJSON } = render(<Checkbox />);

    expect(toJSON()).toMatchSnapshot();
  });

  test('render an unchecked checkbox', async () => {
    const { toJSON } = render(<Checkbox checked={false} />);

    expect(toJSON()).toMatchSnapshot();
  });

  test('render a checked checkbox', async () => {
    const { toJSON } = render(<Checkbox checked={true} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
