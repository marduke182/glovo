import React from 'react';
import { shallow } from 'enzyme';

import Tags from './Tags';

const noTags = [];
const noTag = '';

function setup({ tags = noTags, value = noTag, onChange = jest.fn(), ...props} = {}) {
  const wrapper = shallow(<Tags tags={tags} value={value} onChange={onChange} />);

  return {
    wrapper,
  };
}


test('should render without throwing or warning', async () => {
  const consoleSpy = jest.spyOn(console, 'error');

  expect(setup).not.toThrow();
  expect(consoleSpy).not.toBeCalled();
});
