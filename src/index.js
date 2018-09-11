import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Categories from '@/categories/containers/Categories';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BrowserRouter>
    <React.Fragment>
      <Switch>
        <Route path="/" component={Categories} exact />
      </Switch>
    </React.Fragment>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
