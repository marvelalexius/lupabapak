import {combineReducers} from 'redux';
import user from './user';
import product from './product';
import cart from './cart';

export default combineReducers({
  user,
  product,
  cart,
});
