import identity from 'lodash/fp/identity';

export function addErrorCatching(client) {
  client.interceptors.response.use(identity, error => ({
    error,
  }));
  return client;
}
