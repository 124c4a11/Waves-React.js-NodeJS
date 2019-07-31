import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import store from './store';

import Routes from './routes';

import './styles/index.scss';


ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <ScrollToTop>
        <Routes />
      </ScrollToTop>
    </Router>
  </Provider>
  , document.getElementById('root')
);
