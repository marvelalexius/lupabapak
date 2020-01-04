import axios from 'axios';
import url from '../lib/url';

// Constants
export const PRODUCTS_REQUESTED = 'product/PRODUCTS_REQUESTED';
export const PRODUCTS_LOADED = 'product/PRODUCTS';

const initialState = {
  products: [],
  isRequestingProducts: false,
};

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_REQUESTED:
      // const globalState = store.getState();
      return {
        ...state,
        isRequestingProducts: true,
      };
    case PRODUCTS_LOADED:
      // const globalState = store.getState();
      return {
        ...state,
        products: action.products,
        isRequestingProducts: false,
      };
    default:
      return state;
  }
};

// Actions
export const productRequest = () => {
  return dispatch => {
    dispatch({
      type: PRODUCTS_REQUESTED,
    });

    const Url = `${url}/api/products`;
    axios.get(Url).then(res => {
      return dispatch({
        type: PRODUCTS_LOADED,
        products: res.data.data,
      });
    });
  };
};
