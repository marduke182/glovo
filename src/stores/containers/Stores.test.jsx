import React from 'react';
import { shallow } from 'enzyme';

import Stores from './Stores';

const snackCategory = 'snacks';

function setup({ category, ...props } = {}) {
  const match = {
    params: {
      category,
    }
  };
  const wrapper = shallow(<Stores match={match} {...props} />);
  return {
    wrapper,
  };
}

test('should render without throwing or warning', async () => {
  const consoleSpy = jest.spyOn(console, 'error');

  expect(() => setup({ category: snackCategory })).not.toThrow();
  expect(consoleSpy).not.toBeCalled();
});
