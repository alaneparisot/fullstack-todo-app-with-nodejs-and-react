import { combineReducers } from 'redux';

import authReducer from './authReducer';
import errorReducer from './errorReducer';
import todoReducer from './todoReducer';

const reducers = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  todos: todoReducer,
});

export default reducers;