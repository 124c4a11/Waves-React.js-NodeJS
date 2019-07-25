import axios from 'axios';

import {
  SITE_SERVER,
  GET_SITE_DATA,
  UPDATE_SITE_DATA
} from '../constants';


export const getSiteData = () => async (dispatch) => {
  try {
    const res = await axios.get(`${SITE_SERVER}/site_data`);

    dispatch({
      type: GET_SITE_DATA,
      payload: res.data
    });
  } catch (err) {
    throw err;
  }
};


export const updateSiteData = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${SITE_SERVER}/site_data`, data);

    dispatch({
      type: UPDATE_SITE_DATA,
      payload: res.data
    })
  } catch (err) {
    throw err;
  }
};
