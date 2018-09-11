import React from 'react';
import { shallow } from 'enzyme';

import Tags from '@/shared/components/Tags';
import StoreList from '@/stores/components/StoreList';

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
    wrapper,
    get tags() {
      return wrapper.find(Tags);
    },
    get storeList() {
      return wrapper.find(StoreList);
    }
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

test('should render store list', async () => {
  const stores = setup();

  expect(stores.storeList).toExist();
});


test('should render tags', async () => {
  const stores = setup();

  expect(stores.tags).toExist();
});
