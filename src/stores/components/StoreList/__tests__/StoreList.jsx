import React from 'react';
import { shallow } from 'enzyme';

import StoreList from '../StoreList';
import StoreItem from '../StoreItem';

const noStores = [];
const fooStore = {
  id: 1,
  name: 'foo'
};

function setup({ category, ...props } = {}) {
  const wrapper = shallow(<StoreList {...props} />);
  return {
    wrapper,
    getItemByName(name) {
      return wrapper.find({ name });
    }
  };
}

test('should render without throwing or warning', async () => {
  const consoleSpy = jest.spyOn(console, 'error');

  expect(() => setup({ stores: noStores })).not.toThrow();
  expect(consoleSpy).not.toBeCalled();
});

test('should render store item', async () => {
  const stores = setup({ stores: [fooStore]});

  expect(stores.getItemByName(fooStore.name)).toExist();
});
