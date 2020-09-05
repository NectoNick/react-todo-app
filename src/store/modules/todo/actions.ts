import { createAction, createAsyncAction } from 'typesafe-actions';

import { TodoModel } from '../../../models';


type TodoPayloadModel = Omit<TodoModel, 'date'>;

export const addTodo = createAction(
  'ADD_TODO',
  (payload: TodoPayloadModel): TodoModel => ({
    description: '',
    done: true,
    date: new Date(),
    removed: false,
  })
)();


export const removeTodo = createAction('REMOVE_TODO')<string>();

// export const loadTodosAsync = createAsyncAction(
//   'LOAD_TODOS_REQUEST',
//   'LOAD_TODOS_SUCCESS',
//   'LOAD_TODOS_FAILURE'
// )<undefined, TodoModel[], string>();
//
// export const saveTodosAsync = createAsyncAction(
//   'SAVE_TODOS_REQUEST',
//   'SAVE_TODOS_SUCCESS',
//   'SAVE_TODOS_FAILURE'
// )<undefined, undefined, string>();
