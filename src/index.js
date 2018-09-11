import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Categories from '@/categories/containers/Categories';
import Stores from '@/stores/containers/Stores';

import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route path="/" component={Categories} exact />
        <Route path="/stores/:category" component={Stores} exact />
      </Switch>
    </React.Fragment>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
