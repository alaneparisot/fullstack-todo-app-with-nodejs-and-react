import axios from 'axios';

import { GET_ERRORS } from './types';

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