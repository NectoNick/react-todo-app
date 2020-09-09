import { createAction } from 'typesafe-actions';

import { TodoModel } from '../../../models';


export const createTodo = createAction(
  'CREATE_TODO',
  (payload: TodoModel): TodoModel => ({
    ...payload,
    date: new Date()
  })
)();

export const removeTodos = createAction('REMOVE_TODOS')();

export const removeTodo = createAction('REMOVE_TODO')<string>();
