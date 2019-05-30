import axios from 'axios';

import { USER_SERVER, LOGIN_USER } from '../constants';


export const loginUser = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${USER_SERVER}/login`, data);

    dispatch({
      type: LOGIN_USER,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
}
