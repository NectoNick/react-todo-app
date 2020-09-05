import { RootAction } from './root-actions';


declare module 'typesafe-actions' {

  interface Types {
    RootAction: RootAction;
  }
}
