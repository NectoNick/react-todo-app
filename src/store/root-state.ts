import { RouterState } from 'react-router-redux';

import { State as TodoState } from './modules/todo/state';


interface RootBaseState {
  darkMode: boolean;
}

export interface RootState extends RootBaseState {
  todo: TodoState,
  router: RouterState
}

export const initialState: RootBaseState = {
  darkMode: false,
};
