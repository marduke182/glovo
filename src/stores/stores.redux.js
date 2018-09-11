import { createSelector } from 'reselect';
import { createAction, handleActions } from 'redux-actions';

import glovoClient from '@/shared/libs/glovoClient';

import mapStore from './libs/mapStore';
import sortByOpened from '@/stores/libs/sortByOpened';

const fetchStoreRequest = createAction('FETCH_STORE_REQUEST');
const fetchStoreSuccess = createAction('FETCH_STORE_SUCCESS');
const fetchStoreFailure = createAction('FETCH_STORE_FAILURE');

const initialState = {
  loading: 0, // 0 means no loading
  error: null,
  storeByCategory: {}
};

export default handleActions(
  {
    [fetchStoreRequest]: state => ({
      ...state,
      loading: state.loading + 1
    }),
    [fetchStoreFailure]: (state, { payload: { error } }) => ({
      ...state,
      loading: Math.max(state.loading - 1, 0),
      error
    }),
    [fetchStoreSuccess]: (state, { payload: { category, stores } }) => ({
      ...state,
      loading: Math.max(state.loading - 1, 0),
      storeByCategory: {
        ...state.storeByCategory,
        [category]: stores
      },
      error: null
    })
  },
  initialState
);

export const name = 'stores';

// ACTIONS
const getStoresOf = category => async dispatch => {
  dispatch(fetchStoreRequest());

  const { data, error } = await glovoClient.get(`stores?category=${category}`);

  if (error) {
    dispatch(fetchStoreFailure({ error }));
    return;
  }

  dispatch(
    fetchStoreSuccess({
      category,
      stores: data.stores
    })
  );
};

// SELECTORS
const loadingSelector = state => state[name].loading !== 0;
const errorSelector = state => state[name].error;
const storesByCategory = (state, props) => state[name].storeByCategory[props.category] || [];

const storesWithOpeningInfoByCategory = createSelector(storesByCategory, stores =>
  stores.map(mapStore).sort(sortByOpened)
);

const makeStoresByCategory = () => storesWithOpeningInfoByCategory;

export const selectors = {
  makeStoresByCategory,
  loading: loadingSelector,
  error: errorSelector
};

export const actions = {
  getStoresOf
};
