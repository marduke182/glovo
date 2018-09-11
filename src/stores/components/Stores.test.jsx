import React from 'react';
import { shallow } from 'enzyme';

import Stores from './Stores';

const noStores = [];
const fooStore = {
  id: 1,
  name: 'foo'
};

function setup({ category, ...props } = {}) {
  const wrapper = shallow(<Stores {...props} />);
  return {
    wrapper,
  };
}

test('should render without throwing or warning', async () => {
  const consoleSpy = jest.spyOn(console, 'error');

  expect(() => setup({ stores: noStores })).not.toThrow();
  expect(consoleSpy).not.toBeCalled();
});

test('should render store name', async () => {
  const stores = setup({ stores: [fooStore]});

  expect(stores.wrapper).toHaveText(fooStore.name);
});
