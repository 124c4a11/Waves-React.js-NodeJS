import { combineReducers } from 'redux';

import user from './userReducer';
import products from './productsReducer';
import site from './siteReducer';


export default combineReducers({
  user,
  products,
  site
});
