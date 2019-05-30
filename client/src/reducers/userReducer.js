import {
  REGISTER_USER,
  LOGIN_USER
} from '../constants';


export default (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        isRegister: action.payload.success
      };

    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload.loginSuccess
      };

    default:
      return state;
  }
};
