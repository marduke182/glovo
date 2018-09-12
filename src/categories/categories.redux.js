import { createAction, handleActions } from 'redux-actions';

import getCategories from '@/categories/libs/getCategories';

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

  const { categories, error } = await getCategories();

  if (error) {
    dispatch(fetchCategoriesFailure({ error }));
    return;
  }

  dispatch(
    fetchCategoriesSuccess({
      categories,
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

