import { createSelector } from 'reselect';
import { createAction, handleActions } from 'redux-actions';

import getStores from './libs/getStores';
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
      tag: '',
      error
    }),
    [fetchStoreSuccess]: (state, { payload: { category, stores } }) => ({
      ...state,
      loading: Math.max(state.loading - 1, 0),
      storeByCategory: {
        ...state.storeByCategory,
        [category]: stores
      },
      tag: '',
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

  const { stores, error } = await getStores(category);

  if (error) {
    dispatch(fetchStoreFailure({ error }));
    return;
  }

  dispatch(
    fetchStoreSuccess({
      category,
      stores,
    })
  );

  return stores;
};

// Basic Selectors SELECTORS
const loadingSelector = state => state[name].loading !== 0;
const errorSelector = state => state[name].error;
const tagSelector = state => state[name].tag;
const storesByCategory = (state, props) => state[name].storeByCategory[props.category] || [];

/**
 * Get all tags from a all stores in category
 */
const tagsByCategory = createSelector(storesByCategory, stores =>
  stores
    .reduce((tags, store) => [...tags, ...store.tags], []) // Concat tags
    .filter((value, index, self) => self.indexOf(value) === index) // Unique tags
);

/**
 * Create a selector that return stores by category, sorted by opened property, and filtered by tag
 */
const makeStoresByCategory = () => createSelector(storesByCategory, tagSelector, (stores, tag)=> {
  // Sort the stores first open, last closed
  const sortedStore = stores.sort(sortByOpened);

  // If no tag is selected return the stores
  if (!tag) {
    return sortedStore;
  }

  // Filter stores by tag selected
  return sortedStore.filter(({ tags }) => tags.indexOf(tag) !== -1);
});

// Create a selector to get all tags given a category
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
