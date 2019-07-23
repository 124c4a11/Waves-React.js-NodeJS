import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  LOGOUT_USER,
  UPDATE_USER,
  CLEAR_UPDATE_USER,
  ADD_TO_CART,
  GET_CART_ITEMS,
  UPDATE_CART,
  CHECKOUT
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

    case UPDATE_USER:
      return {
        ...state,
        updateUser: action.payload
      };

    case CLEAR_UPDATE_USER:
      return {
        ...state,
        updateUser: action.payload
      };

    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload
        }
      };

    case GET_CART_ITEMS:
      return {
        ...state,
        cartDetail: action.payload
      };

    case UPDATE_CART:
      const { cart, cartDetail } = action.payload;

      return {
        ...state,
        userData: {
          ...state.userData,
          cart
        },
        cartDetail
      };

    case CHECKOUT:
      return {
        ...state,
        successBuy: action.payload.success,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
        cartDetail: action.payload.cartDetail
      };

    default:
      return state;
  }
};
