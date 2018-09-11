import React from 'react';
import { shallow } from 'enzyme';

import { StoresPage } from './StoresPage';

const snackCategory = 'snacks';

function setup({
  loading = false,
  error = null,
  tags = [],
  tag = '',
  getStoresOf = jest.fn(),
  changeTag = jest.fn(),
  category = snackCategory,
  ...props
} = {}) {
  const wrapper = shallow(
    <StoresPage
      loading={loading}
      error={error}
      tags={tags}
      tag={tag}
      changeTag={changeTag}
      getStoresOf={getStoresOf}
      category={category}
      {...props}
    />
  );
  return {
    wrapper
  };
}

test('should render without throwing or warning', async () => {
  const consoleSpy = jest.spyOn(console, 'error');

  expect(() => setup()).not.toThrow();
  expect(consoleSpy).not.toBeCalled();
});

test(`should called get stores of "${snackCategory}"`, async () => {
  const getStoresOf = jest.fn();
  setup({ getStoresOf, category: snackCategory });

  expect(getStoresOf).toBeCalledWith(snackCategory);
});
