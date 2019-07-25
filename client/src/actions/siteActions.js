import axios from 'axios';

import {
  SITE_SERVER,
  GET_SITE_DATA
} from '../constants';


export const getSiteData = () => async (dispatch) => {
  try {
    const res = await axios(`${SITE_SERVER}/site_data`);

    dispatch({
      type: GET_SITE_DATA,
      payload: res.data
    });
  } catch (err) {
    throw err;
  }
};
