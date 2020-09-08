import * as React from 'react';
import { of, merge } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, map, skip, switchMap, throttleTime } from 'rxjs/operators';

import './TodoBadgeComponent.scss';
import { observableConnect, ObservableStateToProps, MapState$ } from '../../utils';


type OwnProps = {
  count: number;
  className?: string;
}
type Props = OwnProps & ObservableStateToProps<typeof mapStateToProps>;

const mapStateToProps = (state$: MapState$, props: OwnProps) => ({
  animate: state$.pipe(
    map(([, props]) => props.count),
    distinctUntilChanged(),
    skip(1),
    switchMap((count) => merge(
      of(count % 2 === 0 ? 'animation' : 'nextAnimation')
    ))
  )
});

class TodoBadgeComponent extends React.Component<Props> {

  render() {
    const { count, animate, className } = this.props;
    return (
      <span className="badge-container">
        <span className={ `badge ${animate} ${className}` }
              data-bind-class-name="addedClass">
          { count }
        </span>
      </span>
    );
  }
}

export default observableConnect(
  mapStateToProps
)(TodoBadgeComponent);
