import { createAction } from 'typesafe-actions';
import cuid from 'cuid';

import { TodoModel, FormTodoModel } from '../../../models';


export const createTodo = createAction(
  'CREATE_TODO',
  (payload: FormTodoModel): TodoModel => ({
    ...payload,
    id: cuid(),
    date: new Date()
  })
)();

export const updateTodo = createAction(
  'UPDATE_TODO',
  (payload: { id: string, todo: FormTodoModel }): { id: string, todo: FormTodoModel } => payload
)();

export const removeTodos = createAction('REMOVE_TODOS')();

export const removeTodo = createAction('REMOVE_TODO')<string>();
