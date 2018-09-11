import Axios from 'axios';

let axiosCreateSpy;
beforeEach(async () => {
  axiosCreateSpy = jest.spyOn(Axios, 'create');
});

test('should call axios create with api url', async () => {
  await import('../glovoClient');
  expect(axiosCreateSpy).toBeCalledWith({ baseURL: `/api/` });
});
