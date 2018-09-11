import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CategoriesPage from '@/categories/containers/CategoriesPage';
import StoresPage from '@/stores/containers/StoresPage';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import './index.css';

const initialState = {};
const store = configureStore(initialState);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route path="/" component={CategoriesPage} exact />
          <Route path="/category/:category" component={StoresPage} exact />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
