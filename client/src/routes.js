import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import Home from './pages/Home';
import Login from './pages/Login';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCompass,
  faPhone,
  faClock,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';


library.add(
  faCompass,
  faPhone,
  faClock,
  faEnvelope
);


export default () => {
  return (
    <Switch>
      <Layout>
        <Route path="/" exact component={ Home } />
        <Route path="/login" exact component={ Login } />
      </Layout>
    </Switch>
  );
};
