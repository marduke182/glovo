import { createAction, handleActions } from 'redux-actions';
import glovoClient from '@/shared/libs/glovoClient';

import { actions as storeActions } from '@/stores/stores.redux';

const { getStoresOf } = storeActions;

const fetchCategoriesRequest = createAction('FETCH_CATEGORIES_REQUEST');
const fetchCategoriesSuccess = createAction('FETCH_CATEGORIES_SUCCESS');
const fetchCategoriesFailure = createAction('FETCH_CATEGORIES_FAILURE');


const initialState = {
  loading: false,
  error: null,
  categories: [],
};

export default handleActions(
  {
    [fetchCategoriesRequest]: state => ({
      ...state,
      loading: true,
    }),
    [fetchCategoriesFailure]: (
      state,
      { payload: { error } },
    ) => ({
      ...state,
      loading: false,
      error,
    }),
    [fetchCategoriesSuccess]: (
      state,
      { payload: { categories } },
    ) => ({
      ...state,
      loading: false,
      categories,
      error: null,
    }),
  },
  initialState,
);

export const name = 'categories';

// ACTIONS
const getCategoriesAndStores = () => async dispatch => {
  dispatch(fetchCategoriesRequest());

  const { data, error } = await glovoClient.get(`/categories`);

  if (error) {
    dispatch(fetchCategoriesFailure({ error }));
    return;
  }
  const { categories } = data;

  // Retrieve all stores, to calculate sleepy category
  const storesPromises = categories.map(category => dispatch(getStoresOf(category.name)));
  await Promise.all(storesPromises);

  dispatch(
    fetchCategoriesSuccess({
      categories: data.categories,
    }),
  );
};


// SELECTORS
const loadingSelector = state => state[name].loading;
const errorSelector = state => state[name].error;
const categoriesSelector = state => state[name].categories;


export const selectors = {
  categories: categoriesSelector,
  loading: loadingSelector,
  error: errorSelector,
};

export const actions = {
  getCategoriesAndStores,
};

