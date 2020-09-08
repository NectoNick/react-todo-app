import * as React from 'react';
import { map } from 'rxjs/operators';

import './TableCaptionComponent.scss';
import { observableConnect, ObservableStateToProps, MapState$ } from '../../utils';
import Badge from '../todo-badge/TodoBadgeComponent';


type OwnProps = {
  count: number;
}
type Props = OwnProps & ObservableStateToProps<typeof mapStateToProps>;

const mapStateToProps = (state$: MapState$, props: OwnProps) => ({
  pluralEnding: state$.pipe(
    map(([state, props]) => props.count === 1 ? '' : 's')
  )
});

class TableCaptionComponent extends React.Component<Props> {

  render() {
    const { count, pluralEnding } = this.props;
    return (
      <div className="table-caption">
        <span className="padding-right-5">You have</span>
        <span>
          <Badge className="blue"
                 count={ count } />
          TODO{ pluralEnding }</span>
      </div>
    )
  }
}

export default observableConnect(
  mapStateToProps
)(TableCaptionComponent);

// const mapStateToProps = (state$: any) => ({
//   lightMode: 'state$.pipe(map(state => { debugger; return state.lightMode }))',
//   lightMode1: 'state$.pipe(map(state => { debugger; return state.lightMode }))',
// });

// export default connect(
//   (state: RootState, a: any) => ({ darkMode: state.darkMode }),
// )(TodoButtonComponent);
