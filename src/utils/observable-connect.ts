import { Component, ComponentClass } from 'react';
import { connect } from 'react-redux';
import { combineLatest, Subject, Subscription } from 'rxjs';

import { RootState } from '../store/root-state';
import {
  ObservableStateToProps,
  MapObservableStateToProps,
  ClassCtor,
  ObservableProps,
  ObservableValue,
  MapState
} from '../utils';


type MapDispatchToProps = Parameters<typeof connect>[1];
type GetOProps<T extends MapObservableStateToProps> = Parameters<T>[1]

export function observableConnect<
  MSProps extends MapObservableStateToProps,
  DProps extends MapDispatchToProps
>(
  mapObservableStateToProps: MSProps,
  mapDispatchToProps?: DProps
) {

  let observableState: ObservableState | null = null;

  const mapStateToProps = (state: RootState, oProps?: GetOProps<MSProps>): ObservableStateToProps<MSProps> => {
    if (!observableState) {
      observableState = new ObservableState();
      observableState.init(mapObservableStateToProps)
    }
    return observableState.next(oProps ? [state, oProps] : [state]).getProps();
  };

  const connected = connect(
    mapStateToProps,
    mapDispatchToProps
  );

  const componentFunc = <
    C extends ComponentClass<
      { [K in keyof ReturnType<MSProps>]: ObservableValue<ReturnType<MSProps>[K]> } & // ObservableStateToProps<S> &
      (GetOProps<MSProps> extends object ? GetOProps<MSProps> : {}) &
      DProps
    >
  >(componentCtor: C) => {
    class WrappedComponent extends (componentCtor as ClassCtor<Component>) {
      componentWillUnmount() {
        observableState?.unsubscribe();
        observableState = null;
        super.componentWillUnmount?.();
      }
    }
    return connected(WrappedComponent);
  };

  return componentFunc;
}

class ObservableState {
  private state$: Subject<MapState> = new Subject();
  private subscription: Subscription = new Subscription();
  private props: any = {};

  init(mapObservableStateToProps: MapObservableStateToProps): void {
    const observableProps: ObservableProps = mapObservableStateToProps(this.state$.asObservable());
    const observablePropsKeys = Object.keys(observableProps);
    this.subscription = combineLatest(Object.values(observableProps)).subscribe((values) => {
      this.props = values.reduce((acc: any, value, index) => {
        return { ...acc, [observablePropsKeys[index]]: value };
      }, {});
    });
  }

  next(state: MapState): this {
    this.state$.next(state);
    return this;
  }

  getProps() {
    return this.props;
  }

  unsubscribe(): void {
    this.subscription.unsubscribe();
  }
}

// export function observableConnect<TDispatchProps = {}, TOwnProps = {}>(
//   mapObservableStateToProps: MapObservableStateToProps,
//   mapDispatchToProps?: MapDispatchToProps<TDispatchProps, TOwnProps>
//   // mapDispatchToProps: Parameters<typeof connect>
// ) {
//
//   // return <T extends ClassCtor<React.Component/*<S, TDispatchProps, TOwnProps>*/>>(componentCtor: T): T => {
//   return (componentCtor: any): any => {
//
//     let observableState: ObservableState | null = null;
//
//     class WrappedComponent extends componentCtor {
//       componentWillUnmount() {
//         observableState?.unsubscribe();
//         observableState = null;
//         super.componentWillUnmount?.()
//       }
//     }
//
//     const mapStateToProps = (state: RootState, props: any): ObservableStateToProps<MapObservableStateToProps> => {
//       if (!observableState) {
//         observableState = new ObservableState();
//         observableState.init(mapObservableStateToProps)
//       }
//       observableState.next(state);
//       // const q: ObservableStateToProps<S> = observableState.getProps();
//       return observableState.getProps();/*ObservableStateToProps<MapObservableStateToProps>;*/
//     };
//
//     return connect(
//       mapStateToProps,
//       mapDispatchToProps
//     )(componentCtor) as ReturnType<ReturnType<Connect>>;
//   }
// }
