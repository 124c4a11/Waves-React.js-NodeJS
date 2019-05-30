import { LOGIN_USER } from '../constants';


export default (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload.loginSuccess
      };

    default:
      return state;
  }
};
