import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CategoriesPage from '@/categories/containers/CategoriesPage';
import StoresPage from '@/stores/containers/StoresPage';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route path="/" component={CategoriesPage} exact />
        <Route path="/category/:category" component={StoresPage} exact />
      </Switch>
    </React.Fragment>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
