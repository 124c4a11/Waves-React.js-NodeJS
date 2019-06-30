import axios from 'axios';

import {
  PRODUCT_SERVER,
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_PRODUCTS_TO_SHOP,
  ADD_BRAND,
  GET_BRANDS,
  ADD_WOOD,
  GET_WOODS,
  ADD_PRODUCT,
  CLEAR_PRODUCT,
  GET_PRODUCT_DETAIL,
  CLEAR_PRODUCT_DETAIL
} from '../constants';


export const getProductDetail = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${PRODUCT_SERVER}?id=${id}&type=single`);

    console.log(res);

    dispatch({
      type: GET_PRODUCT_DETAIL,
      payload: res.data
    });
  } catch (err) {
    throw err;
  }
};


export const clearProductDetail = () => {
  return {
    type: CLEAR_PRODUCT_DETAIL,
    payload: ''
  };
};


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


export const getProductsToShop = (skip, limit, filters = [], prevState = []) => async (dispatch) => {
  const data = {
    limit,
    skip,
    filters
  };

  try {
    const res = await axios.post(`${PRODUCT_SERVER}/shop`, data);

    const newState = [
      ...prevState,
      ...res.data.articles
    ];

    dispatch({
      type: GET_PRODUCTS_TO_SHOP,
      payload: {
        size: res.data.size,
        articles: newState
      }
    });
  } catch (err) {
    throw err;
  }
}


export const addBrand = (newBrand, existingBrands) => async (dispatch) => {
  try {
    const res = await axios.post(`${PRODUCT_SERVER}/brand`, newBrand);

    if (!res.data.success) {
      dispatch({
        type: ADD_BRAND,
        payload: {
          success: res.data.success,
          brands: [ ...existingBrands ]
        }
      });

      return;
    }

    dispatch ({
      type: ADD_BRAND,
      payload: {
        success: res.data.success,
        brands: [
          ...existingBrands,
          res.data.brand
        ]
      }
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


export const addWood = (newWood, existingWoods) => async (dispatch) => {
  try {
    const res = await axios.post(`${PRODUCT_SERVER}/wood`, newWood);

    if (!res.data.success) {
      dispatch({
        type: ADD_WOOD,
        payload: {
          success: res.data.success,
          woods: [ ...existingWoods ]
        }
      });

      return;
    }

    dispatch ({
      type: ADD_WOOD,
      payload: {
        success: res.data.success,
        woods: [
          ...existingWoods,
          res.data.wood
        ]
      }
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


export const addProduct = (dataToSubmit) => async (dispatch) => {
  try {
    const res = await axios.post(`${PRODUCT_SERVER}/article`, dataToSubmit);

    dispatch({
      type: ADD_PRODUCT,
      payload: res.data
    })
  } catch (err) {
    throw err;
  }
};


export const clearProduct = () => {
  return {
    type: CLEAR_PRODUCT,
    payload: ''
  };
}
