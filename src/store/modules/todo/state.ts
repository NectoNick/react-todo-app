import { TodoModel } from '../../../models';


export interface State {
  todos: TodoModel[];
}

export const initialState: State = {
  todos: [],
};
