import { TodoModel } from '../../../models';


export interface State {
  // todo: TodoModel;
  todos: TodoModel[];
}

export const initialState: State = {
  todos: [],
};
