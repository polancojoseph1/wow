import axios from 'axios';

// INITIAL STATE
const defaultUser = {};

const AUTH_USER = 'AUTH_USER'

const authUser = (auth) => {
    return {
        type: AUTH_USER,
        auth
    }
}

export const signup = user => async dispatch => {
    try {
      const {data} = await axios.post(`/api/users/signup`, user);
        dispatch(authUser(data))
    } catch (error) {
      console.error(error);
    }
  };

  export const login = user => async dispatch => {
    try {
      const {data} = await axios.post(`/api/users/login`, user);
        dispatch(authUser(data))
    } catch (error) {
      console.error(error);
    }
  };

export const logout = () => async () => {
  try {
    await axios.post('/auth/logout');
    localStorage.clear();
    history.push('/videos');
  } catch (err) {
    console.error(err);
  }
};

// REDUCER
const auth = (state = defaultUser, action) => {
  switch (action.type) {
    case AUTH_USER:
      return action.auth;
    // case REMOVE_USER:
    //   return defaultUser;
    default:
      return state;
  }
};

export default auth;
