import axios from 'axios';

import { GET_TODOS, UPDATE_TODO, DELETE_TODO, } from './types';
import { clearErrors, dispatchErrors, } from './errorActions';

export const getTodos = () => async (dispatch) => {
  try {
    const {todos} = (await axios.get('/api/todo/all')).data;
    dispatch({
      type: GET_TODOS,
      payload: todos,
    });
    clearErrors(dispatch);
  } catch (e) {
    dispatchErrors(dispatch, e.response.data);
  }
};

export const addTodo = (todoTitle) => async (dispatch) => {
  try {
    const {todos} = (await axios.post('/api/todo/new', {title: todoTitle})).data;
    dispatch({
      type: GET_TODOS,
      payload: todos,
    });
    clearErrors(dispatch);
  } catch (e) {
    dispatchErrors(dispatch, e.response.data);
  }
};

export const updateTodo = (todoData) => async (dispatch) => {
  try {
    const {todo} = (await axios.patch('/api/todo/' + todoData._id, todoData)).data;
    dispatch({
      type: UPDATE_TODO,
      payload: todo,
    });
    clearErrors(dispatch);
  } catch (e) {
    dispatchErrors(dispatch, e.response.data);
  }
};

export const deleteTodo = (todoId) => async (dispatch) => {
  try {
    const {todos} = (await axios.delete('/api/todo/' + todoId)).data;
    dispatch({
      type: DELETE_TODO,
      payload: todos,
    });
    clearErrors(dispatch);
  } catch (e) {
    dispatchErrors(dispatch, e.response.data);
  }
};
