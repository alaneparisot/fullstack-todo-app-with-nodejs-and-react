import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../../utils/setAuthToken';

export const registerUser = (user, history) => async (dispatch) => {
  try {
    await axios.post('/api/user/register', user);
    history.push('/');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const loginUser = (user) => async (dispatch) => {
  try {
    const {token} = (await axios.post('/api/user/login', user)).data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});