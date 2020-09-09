import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { createTodo, removeTodo, removeTodos } from './actions';
import { initialState, State } from './state';


const todos = createReducer(initialState.todos)
  .handleAction(createTodo, (todos, { payload }) => [...todos, payload])
  .handleAction(removeTodos, () => []);

export const todoReducer = combineReducers<State>({
  todos,
});
