import React from 'react';
import { shallow } from 'enzyme';

import Categories from './CategoriesPage';

function setup(props = {}) {
  const wrapper = shallow(<Categories {...props} />);
  return {
    wrapper,
  };
}

test('should render without throwing or warning', async () => {
  const consoleSpy = jest.spyOn(console, 'error');
  expect(setup).not.toThrow();

  expect(consoleSpy).not.toBeCalled();
});
