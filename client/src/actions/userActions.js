import axios from 'axios';

import {
  USER_SERVER,
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER
} from '../constants';


export const registerUser = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`${USER_SERVER}/register`, data);

    dispatch({
      type: REGISTER_USER,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
    dispatch({
      type: REGISTER_USER,
      payload: { success: false }
    });
  }
};


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
};


export const auth = () => async (dispatch) => {
  try {
    const res = await axios.get(`${USER_SERVER}/auth`);

    dispatch({
      type: AUTH_USER,
      payload: res.data
    });
  } catch (err) {
    throw err;
  }
};
