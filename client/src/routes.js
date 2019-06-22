import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout';
import Auth from './hoc/Auth';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import Logout from './pages/Logout';
import Shop from './pages/Shop';
import AddProduct from './pages/AddProduct';

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
        <Route path="/" exact component={ Auth(Home, null) } />

        <Route path="/login" exact component={ Auth(Login, false) } />

        <Route path="/register" exact component={ Auth(Register, false) } />

        <Route path="/logout" exact component={ Auth(Logout, true) } />

        <Route path="/shop" exact component={ Auth(Shop, null) } />

        <Route path="/user/dashboard" exact component={ Auth(UserDashboard, true) } />

        <Route path="/admin/add_product" exact component={ Auth(AddProduct,true) }/>
      </Layout>
    </Switch>
  );
};
