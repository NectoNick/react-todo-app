import { PayloadActionCreator } from 'typesafe-actions';


type ActionToProp<T extends PayloadActionCreator<any, any>> = (payload: ReturnType<T>['payload']) => void;

export type ActionsToProps<T extends Record<string, PayloadActionCreator<any, any>>> =
  Record<string, (payload: ReturnType<T[keyof T]>['payload']) => void>;
