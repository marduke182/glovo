import { combineReducers } from 'redux';
import * as categoriesRedux from '@/categories/categories.redux';
import * as storesRedux from '@/stores/stores.redux';

export default function createReducer(asyncReducers) {
  return combineReducers({
    [categoriesRedux.name]: categoriesRedux.default,
    [storesRedux.name]: storesRedux.default,
    ...asyncReducers,
  });
}
