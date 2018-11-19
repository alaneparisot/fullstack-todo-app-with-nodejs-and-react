import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { SET_CURRENT_USER } from './types';
import { clearErrors, dispatchErrors, } from './errorActions';
import setAuthToken from '../../utils/setAuthToken';

export const registerUser = (user, history) => async (dispatch) => {
  try {
    await axios.post('/api/user/register', user);
    clearErrors(dispatch);
    history.push('/login');
  } catch (e) {
    dispatchErrors(dispatch, e.response.data);
  }
};

export const loginUser = (user) => async (dispatch) => {
  try {
    const {token} = (await axios.post('/api/user/login', user)).data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));
    clearErrors(dispatch);
  } catch (e) {
    dispatchErrors(dispatch, e.response.data);
  }
};

export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  if (history) { history.push('/'); }
};

export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});