// Constants
export const USER_LOGGED_IN = 'user/USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'user/USER_LOGGED_OUT';

const initialState = {
  user: [],
  isLogin: false,
  token: null,
};

// Reducers
export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      // const globalState = store.getState();
      return {
        ...state,
        user: action.user,
        isLogin: true,
        token: action.token,
      };
    case USER_LOGGED_OUT:
      // const globalState = store.getState();
      return {
        ...state,
        user: [],
        isLogin: false,
        token: [],
      };
    default:
      return state;
  }
};

// Actions
export const userLoggedIn = (user, token) => {
  return dispatch => {
    dispatch({
      type: USER_LOGGED_IN,
      user,
      token,
    });
  };
};

export const userLoggedOut = () => {
  return dispatch => {
    dispatch({
      type: USER_LOGGED_OUT,
    });
  };
};
