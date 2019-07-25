import { GET_SITE_DATA } from '../constants';


export default (state = {}, action) => {
  switch (action.type) {
    case GET_SITE_DATA:
      return {
        ...state,
        siteData: action.payload
      }
    default:
      return state;
  }
};
