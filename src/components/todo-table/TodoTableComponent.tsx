import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import './TodoTableComponent.scss';
import { TodoModel } from '../../models';
import { RootState } from '../../store/root-state';
import EditableTableRow from './EditableTableRowComponent';


type OwnProps = {
  rows: TodoModel[];
}
type Props = OwnProps & ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: RootState, props: OwnProps) => ({

});

class TodoTableComponent extends React.Component<Props> {

  render() {
    const {  } = this.props;
    return (
      <div className="todo-table-container">

        <div className="todo-table">

          <div className="heading"> {/* TODO use TableRow instead */}
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

              <EditableTableRow key={ index }
                                model={row} />
            )
          }
        </div>

      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(TodoTableComponent);
