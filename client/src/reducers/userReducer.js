import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  LOGOUT_USER,
  ADD_TO_CART
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

    case AUTH_USER:
      return {
        ...state,
        userData: action.payload
      };

    case LOGOUT_USER:
      return {
        ...state,
        success: action.payload.success
      };

    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload
        }
      };

    default:
      return state;
  }
};
