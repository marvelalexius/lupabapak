import {combineReducers} from 'redux';
import user from './user';
import product from './product';
import cart from './cart';
import wishlist from './wishlist';

export default combineReducers({
  user,
  product,
  cart,
  wishlist,
});
