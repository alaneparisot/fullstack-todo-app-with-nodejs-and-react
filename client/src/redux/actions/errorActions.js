import { GET_ERRORS } from './types';

export const clearErrors = (dispatch) => {
  dispatchErrors(dispatch, {});
};

export const dispatchErrors = (dispatch, payload) => {
  dispatch({
    type: GET_ERRORS,
    payload,
  });
};