import axios from 'axios';
import url from '../lib/url';

// Constants
export const WISHLISTS_REQUESTED = 'wishlist/WISHLISTS_REQUESTED';
export const WISHLISTS_LOADED = 'wishlist/WISHLISTS';

const initialState = {
  wishlists: [],
  isRequestingWishlists: false,
};

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case WISHLISTS_REQUESTED:
      // const globalState = store.getState();
      return {
        ...state,
        isRequestingWishlists: true,
      };
    case WISHLISTS_LOADED:
      // const globalState = store.getState();
      return {
        ...state,
        wishlists: action.wishlists,
        isRequestingWishlists: false,
      };
    default:
      return state;
  }
};

// Actions
export const wishlistRequest = user_id => {
  return dispatch => {
    dispatch({
      type: WISHLISTS_REQUESTED,
    });

    console.log(user_id);

    const Url = `${url}/api/wishlist?user_id=${user_id}`;
    axios.get(Url).then(res => {
      return dispatch({
        type: WISHLISTS_LOADED,
        wishlists: res.data.data,
      });
    });
  };
};
