import { routerActions } from 'react-router-redux';
import { createAction, ActionType } from 'typesafe-actions';

import * as todoActions from './modules/todo/actions';


export const switchMode = createAction(
  'SWITCH_MODE',
  // (mode: boolean): boolean => !mode
)();

export const switchLightMode = createAction(
  'SWITCH_LIGHT_MODE',
  // (mode: boolean): boolean => !mode
)();

const rootActions = {
  router: routerActions,
  switchMode,
  switchLightMode,
  todo: todoActions,
};

export type RootAction = ActionType<typeof rootActions>;
