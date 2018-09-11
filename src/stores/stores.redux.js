import { createSelector } from 'reselect';
import { createAction, handleActions } from 'redux-actions';

import glovoClient from '@/shared/libs/glovoClient';

import mapStore from './libs/mapStore';
import sortByOpened from '@/stores/libs/sortByOpened';

const fetchStoreRequest = createAction('FETCH_STORE_REQUEST');
const fetchStoreSuccess = createAction('FETCH_STORE_SUCCESS');
const fetchStoreFailure = createAction('FETCH_STORE_FAILURE');

const changeTag = createAction('CHANGE_TAG');

const initialState = {
  loading: 0, // 0 means no loading
  error: null,
  tag: '',
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
    }),
    [changeTag]: (state, { payload: tag}) => ({
      ...state,
      tag
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

// Basic Selectors SELECTORS
const loadingSelector = state => state[name].loading !== 0;
const errorSelector = state => state[name].error;
const tagSelector = state => state[name].tag;
const storesByCategory = (state, props) => state[name].storeByCategory[props.category] || [];

// Get all tags from the stores in a category
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function concatTags(tags, store) {
  return [...tags, ...store.tags];
}

const tagsByCategory = createSelector(storesByCategory, stores =>
  stores.reduce(concatTags, []).filter(onlyUnique)
);

/**
 * Add store info (is opened and next schedule day) and sort by is opened
 */
const storesWithOpeningInfoByCategory = createSelector(storesByCategory, stores =>
  stores.map(mapStore).sort(sortByOpened)
);

/**
 * Filter store by Tag
 */
const storesByTag = createSelector(storesWithOpeningInfoByCategory, tagSelector, (stores, tag)=> {
  if (!tag) {
    return stores;
  }

  return stores.filter(({ tags }) => tags.indexOf(tag) !== -1);
});

const makeStoresByCategory = () => storesByTag;
const makeTagsByCategory = () => tagsByCategory;

export const selectors = {
  makeStoresByCategory,
  makeTagsByCategory,
  loading: loadingSelector,
  error: errorSelector,
  tag: tagSelector,
};

export const actions = {
  getStoresOf,
  changeTag
};
