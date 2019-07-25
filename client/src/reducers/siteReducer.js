import {
  GET_SITE_DATA,
  UPDATE_SITE_DATA
} from '../constants';


export default (state = {}, action) => {
  switch (action.type) {
    case GET_SITE_DATA:
      return {
        ...state,
        siteData: action.payload
      };

    case UPDATE_SITE_DATA:
      return {
        ...state,
        success: action.payload.success,
        siteData: action.payload.siteInfo
      };

    default:
      return state;
  }
};
