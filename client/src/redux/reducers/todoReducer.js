import { GET_TODOS, UPDATE_TODO, DELETE_TODO, } from '../actions/types';

const initialState = {
  list: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        list: action.payload
      };
    case UPDATE_TODO:
      return {
        ...state,
        todo: action.payload
      };
    case DELETE_TODO:
      return {
        ...state,
        list: action.payload
      };
    default:
      return state;
  }
};