import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';

import Routes from './routes';

import './styles/index.scss';


ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <Routes />
    </Router>
  </Provider>
  , document.getElementById('root')
);
