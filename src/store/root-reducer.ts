import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';
import { routerReducer } from 'react-router-redux';

import { switchMode } from './root-actions';
import { initialState, RootState } from './root-state';
import { todoReducer } from './modules/todo/reducer';


const switchModeReducer = createReducer(initialState.darkMode)
  .handleAction(switchMode, (state) => !state);

export const rootReducer = combineReducers<RootState>({
  router: routerReducer,
  darkMode: switchModeReducer,
  todo: todoReducer
});
