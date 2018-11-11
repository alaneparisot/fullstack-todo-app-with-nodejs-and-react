import { combineReducers } from 'redux';

import errorReducer from './errorReducer';

const reducers = combineReducers({
  errors: errorReducer,
});

export default reducers;