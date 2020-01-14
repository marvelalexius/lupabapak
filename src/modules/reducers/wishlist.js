import axios from 'axios';
import url from '../lib/url';
import store from '../stores';

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
export const wishlistRequest = (user_id, user_token) => {
  return dispatch => {
    dispatch({
      type: WISHLISTS_REQUESTED,
      user_id,
      user_token,
    });

    console.log(`${user_id} , ${user_token}`);
    // console.log(`${url}/api/wishlist?user_id=${user.id}`);

    // let config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + user.token,
    //   },
    // };

    // const Url = `${url}/api/wishlist?user_id=${user.id}`;
    // axios.get(Url, config).then(res => {
    //   return dispatch({
    //     type: WISHLISTS_LOADED,
    //     wishlists: res.data.data,
    //   });
    // });
  };
};
