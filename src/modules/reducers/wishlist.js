// Constants
export const WISHLIST_ADDED = 'wishlist/WISHLIST_ADDED';
export const WISHLIST_REMOVED = 'wishlist/WISHLIST_REMOVED';

const initialState = {
  wishlists: [],
  isRequestingProducts: false,
};

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case WISHLIST_ADDED:
      // const globalState = store.getState();
      return {
        ...state,
        wishlists: [...state.wishlists, action.product],
      };
    case WISHLIST_REMOVED:
      // const globalState = store.getState();
      let filtered_wishlists = state.wishlists.filter(wishlist => {
        if (wishlist.id !== action.product) {
          return wishlist;
        }
      });

      // console.log(filtered_wishlists);
      return {
        ...state,
        wishlists: filtered_wishlists,
      };
    default:
      return state;
  }
};

// Actions
export const removeFromWishlist = product_id => {
  return dispatch => {
    dispatch({
      type: WISHLIST_REMOVED,
      product: product_id,
    });
  };
};

export const addToWishlist = product_id => {
  return dispatch => {
    dispatch({
      type: WISHLIST_ADDED,
      product: product_id,
    });
  };
};
