import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { createTodo, removeTodo, removeTodos, updateTodo } from './actions';
import { initialState, State } from './state';


const todos = createReducer(initialState.todos)
  .handleAction(createTodo, (todos, { payload }) => [...todos, payload])
  .handleAction(removeTodo, (todos, { payload }) => todos.filter(todo => todo.id !== payload))
  .handleAction(removeTodos, () => [])
  .handleAction(updateTodo, (todos, { payload: { id, todo } }) => todos.map((oldTodo) => {
    return oldTodo.id === id ? { ...oldTodo, ...todo } : oldTodo;
  }));

export const todoReducer = combineReducers<State>({
  todos,
});
