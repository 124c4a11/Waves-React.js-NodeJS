import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import Home from './components/Home';

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
      </Layout>
    </Switch>
  );
};
