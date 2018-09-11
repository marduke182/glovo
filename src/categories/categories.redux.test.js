import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose, combineReducers } from 'redux';

import glovoClient from '../shared/libs/glovoClient';
import reducer, { actions, selectors, name } from './categories.redux';
import { actions as storeActions } from '../stores/stores.redux';

jest.mock('../shared/libs/glovoClient');
jest.mock('../stores/stores.redux');


function setup(initialState = {}) {
  const middlewares = [thunk];

  const enhancers = [applyMiddleware(...middlewares)];
  const store = createStore(
    combineReducers({ [name]: reducer }),
    initialState,
    compose(...enhancers)
  );

  return {
    store
  };
}

beforeEach(async () => {
  jest.spyOn(storeActions, 'getStoresOf').mockImplementation(() => async () => {});
});

test('should have initial state', async () => {
  const { store } = setup();
  expect(store.getState()).toMatchSnapshot();
});

describe('get categories', () => {
  beforeEach(async () => {
    glovoClient.get.mockClear();
  });

  test('should show loading', async () => {
    glovoClient.get.mockReturnValueOnce(new Promise(() => {}));
    const { store } = setup();

    store.dispatch(actions.getCategoriesAndStores());

    expect(selectors.loading(store.getState())).toBe(true);
  });

  describe('success', () => {

    const categoriesResponse = {
      data: {
        categories: [
          {
            id: 3,
            label: 'Snacks',
            name: 'snacks',
            openIcon: 'http://localhost:3000/img/snacks-open.png',
            sleepIcon: 'http://localhost:3000/img/snacks-sleep.png'
          },
          {
            id: 2,
            label: 'Gifts',
            name: 'gifts',
            openIcon: 'http://localhost:3000/img/gifts-open.png',
            sleepIcon: 'http://localhost:3000/img/gifts-sleep.png'
          },
          {
            id: 1,
            label: 'Restaurants',
            name: 'restaurants',
            openIcon: 'http://localhost:3000/img/restaurants-open.png',
            sleepIcon: 'http://localhost:3000/img/restaurants-sleep.png'
          },
          {
            id: 4,
            label: 'Wonders',
            name: 'wonders',
            openIcon: 'http://localhost:3000/img/wonders-open.png',
            sleepIcon: 'http://localhost:3000/img/wonders-sleep.png'
          }
        ]
      }
    };

    beforeEach(async () => {
      glovoClient.get.mockImplementation(async () => categoriesResponse);
    });

    test('should store categories in store', async () => {

      const { store } = setup();

      await store.dispatch(actions.getCategoriesAndStores());

      expect(selectors.categories(store.getState())).toEqual(categoriesResponse.data.categories);
    });
  });
});
