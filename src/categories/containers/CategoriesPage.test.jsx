import React from 'react';
import { shallow } from 'enzyme';

import { CategoriesPage } from './CategoriesPage';

const noCategories = [];

function setup({
  loading = true,
  error = null,
  getCategoriesAndStores = jest.fn(),
  categories = noCategories,
  ...props,
} = {}) {
  const wrapper = shallow(<CategoriesPage loading={loading} error={error} getCategoriesAndStores={getCategoriesAndStores} categories={categories} {...props} />);
  return {
    wrapper
  };
}

test('should render without throwing or warning', async () => {
  const consoleSpy = jest.spyOn(console, 'error');
  expect(setup).not.toThrow();

  expect(consoleSpy).not.toBeCalled();
});
