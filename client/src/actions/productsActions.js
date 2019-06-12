import axios from 'axios';

import {
  PRODUCT_SERVER,
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  GET_WOODS
} from '../constants';


export const getProductsBySell = () => async (dispatch) => {
  // /articles?sortBy=sold&order=desc&limit=5
  try {
    const res = await axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`);

    dispatch({
      type: GET_PRODUCTS_BY_SELL,
      payload: res.data
    });
  } catch (err) {
    throw err;
  }
};


export const getProductsByArrival = () => async (dispatch) => {
  // /articles?sortBy=createdAt&order=desc&limit=5
  try {
    const res = await axios.get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`);

    dispatch({
      type: GET_PRODUCTS_BY_ARRIVAL,
      payload: res.data
    });
  } catch (err) {
    throw err;
  }
};


export const getBrands = () => async (dispatch) => {
  try {
    const res = await axios.get(`${PRODUCT_SERVER}/brands`);

    dispatch({
      type: GET_BRANDS,
      payload: res.data
    });
  } catch (err) {
    throw err;
  }
};


export const getWoods = () => async (dispatch) => {
  try {
    const res = await axios.get(`${PRODUCT_SERVER}/woods`);

    dispatch({
      type: GET_WOODS,
      payload: res.data
    });
  } catch (err) {
    throw err;
  }
};
