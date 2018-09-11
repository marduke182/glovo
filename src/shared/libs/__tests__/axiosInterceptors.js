import identity from 'lodash/fp/identity';

import { addErrorCatching } from '../axiosInterceptors';

describe('addErrorCatching', () => {
  test('should add error response interceptor', () => {
    const use = jest.fn();
    const fooError = 'fooError';
    const client = {
      interceptors: { response: { use } },
    };

    addErrorCatching(client);

    expect(use).toBeCalledWith(identity, expect.any(Function));
    expect(use.mock.calls[0][1](fooError)).toEqual({ error: fooError });
  });
});
