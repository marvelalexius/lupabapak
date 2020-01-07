// Constants
export const PRODUCT_ADDED = 'cart/PRODUCT_ADDED';
export const PRODUCT_REMOVED = 'cart/PRODUCT_REMOVED';

const initialState = {
  carts: [],
  isRequestingProducts: false,
};

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_ADDED:
      // const globalState = store.getState();
      return {
        ...state,
        carts: [...state.carts, action.product],
      };
    case PRODUCT_REMOVED:
      // const globalState = store.getState();
      let filtered_carts = state.carts.filter(cart => {
        if (cart.id !== action.product) {
          return cart;
        }
      });

      // console.log(filtered_carts);
      return {
        ...state,
        carts: filtered_carts,
      };
    default:
      return state;
  }
};

// Actions
export const removeFromCart = product => {
  return dispatch => {
    dispatch({
      type: PRODUCT_REMOVED,
      product: product,
    });
  };
};

export const addToCart = product_id => {
  return dispatch => {
    dispatch({
      type: PRODUCT_ADDED,
      product: product_id,
    });
  };
};
