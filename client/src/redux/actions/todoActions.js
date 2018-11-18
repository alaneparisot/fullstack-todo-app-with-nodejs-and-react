import axios from 'axios';

import { GET_TODOS, UPDATE_TODO, DELETE_TODO, GET_ERRORS, } from './types';

export const getTodos = () => (dispatch) => {
  // TODO: Use async/await
  axios
    .get('/api/todo/all')
    .then((res) => dispatch({
      type: GET_TODOS,
      payload: res.data.todos
    }))
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const addTodo = (title) => async (dispatch) => {
  try {
    const todos = (await axios.post('/api/todo/new', {title})).data.todos;
    dispatch({
      type: GET_TODOS,
      payload: todos
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const updateTodo = (todo) => (dispatch) => {
  // TODO: Use async/await
  axios
    .patch('/api/todo/' + todo._id, todo)
    .then((res) => dispatch({
      type: UPDATE_TODO,
      payload: res.data.todo
    }))
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const deleteTodo = (id) => (dispatch) => {
  // TODO: Use async/await
  axios
    .delete('/api/todo/' + id)
    .then((res) => dispatch({
      type: DELETE_TODO,
      payload: res.data.todos
    }))
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};