import { createSelector } from 'reselect';

import { State } from './state';


export const getTodoList = (state: State) => state.todos;

export const getTodoListTotal = createSelector(
  getTodoList,
  ({ length }) => length
);

export const getTodoListDone = createSelector(
  getTodoList,
  (todoList) => todoList.filter(({ done }) => done).length
);

export const getTodoListLeft = createSelector(
  [getTodoListTotal, getTodoListDone],
  (total, done) => total - done
);
