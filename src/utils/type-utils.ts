import { PayloadActionCreator } from 'typesafe-actions';
import { Observable } from 'rxjs';
import { RootState } from '../store/root-state';


type ActionToProp<T extends PayloadActionCreator<any, any>> = (payload: ReturnType<T>['payload']) => void;

type ActionsToProps<T extends Record<string, PayloadActionCreator<any, any>>> =
  Record<string, (payload: ReturnType<T[keyof T]>['payload']) => void>;

export type ObservableValue<T extends Observable<any>> = Parameters<
  NonNullable<Parameters<
    T['subscribe']
  >[0]>
>[0];

export interface ClassCtor<T = {}> {
  new (...args: any[]): T
}
export type MapState = [RootState, any?];
export type MapState$ = Observable<MapState>;
export type ObservableProps = Record<string, Observable<unknown>>;
export type MapObservableStateToProps = (
  state$: MapState$,
  ownProps?: any,
) => ObservableProps;

type SProps<T extends MapObservableStateToProps> = { [K in keyof ReturnType<T>]: ObservableValue<ReturnType<T>[K]> };
export type ObservableStateToProps<T extends MapObservableStateToProps> = SProps<T>;
