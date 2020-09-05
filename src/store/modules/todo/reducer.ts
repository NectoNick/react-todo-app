import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { /*loadTodosAsync,*/ addTodo, removeTodo } from './actions';
import { initialState, State } from './state';


// export const isLoadingTodos = createReducer(false as boolean)
//   .handleAction([loadTodosAsync.request], (state, action) => true)
//   .handleAction(
//     [loadTodosAsync.success, loadTodosAsync.failure],
//     (state, action) => false
//   );

const todos = createReducer(initialState.todos)
  .handleAction(addTodo, (state, action) => [...state, action.payload]);

export const todoReducer = combineReducers<State>({
  // isLoadingTodos,
  todos,
});
