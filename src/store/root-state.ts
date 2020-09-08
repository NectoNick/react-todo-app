import { RouterState } from 'react-router-redux';

import { State as TodoState } from './modules/todo/state';
import { Observable } from 'rxjs';


interface RootBaseState {
  darkMode: boolean;
  lightMode: boolean;
}

export interface RootState extends RootBaseState {
  todo: TodoState,
  router: RouterState
}

export const initialState: RootBaseState = {
  darkMode: false,
  lightMode: true
};

export type RootState$ = Observable<RootState>;
