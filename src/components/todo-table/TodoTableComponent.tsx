import * as React from 'react';
import { map } from 'rxjs/operators';

import './TodoTableComponent.scss';
import { observableConnect, ObservableStateToProps, MapState$ } from '../../utils';
import { TodoModel } from '../../models';
import EditableTableRow from './EditableTableRowComponent';


type OwnProps = {
  rows: TodoModel[];
}
type Props = OwnProps & ObservableStateToProps<typeof mapStateToProps>;

const mapStateToProps = (state$: MapState$, props: OwnProps) => ({
  pluralEnding: state$.pipe(
    map(([state, props]) => props.count === 1 ? '' : 's')
  )
});

class TodoTableComponent extends React.Component<Props> {

  render() {
    const {  } = this.props;
    return (
      <div className="todo-table-container">

        <div className="todo-table">

          <div className="heading">
            <div className="cell">
              <p>Description</p>
            </div>
            <div className="cell">
              <p>Is done</p>
            </div>
            <div className="cell">
              <p>Created</p>
            </div>
          </div>

          {
            this.props.rows.map((row, index) =>

              <EditableTableRow model={row} />
            )
          }
        </div>

      </div>
    )
  }
}

export default observableConnect(
  mapStateToProps
)(TodoTableComponent);
