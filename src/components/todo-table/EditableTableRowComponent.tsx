import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import './EditableTableRowComponent.scss';
import { RootState } from '../../store/root-state';
import { TodoModel } from '../../models';
import TodoButton from '../todo-button/TodoButtonComponent';
import TableRow from '../todo-table/TableRowComponent';


type OwnProps = {
  model: TodoModel;
}
type Props = OwnProps & ReturnType<ReturnType<typeof mapStateToProps>>;

const makeNewRowBgColorSelector = () => createSelector(
  ({ model }: OwnProps) => model,
  model => model.done ? 'green' : 'red'
);

const mapStateToProps = () => {
  const newRowBgColorSelector = makeNewRowBgColorSelector();

  return (state: RootState, props: OwnProps) => ({
    newRowBgColor: newRowBgColorSelector(props)
  });
};


class EditableTableRowComponent extends React.Component<Props> {

  render() {
    const { model, newRowBgColor } = this.props;
    return (
      <div className={ `editable-table-row-container ${newRowBgColor}` }
           data-bind-class="{ 'edit-mode': 'editMode', 'edit-mode-popup': 'editModeAnimate' }"
           data-bind-class-name="newRowBackgroundColor">

        <TableRow model={model}
                  data-bind-clicked="rowClicked"/>

      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(EditableTableRowComponent);
