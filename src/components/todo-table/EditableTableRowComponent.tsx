import * as React from 'react';
import { first, map } from 'rxjs/operators';

import './EditableTableRowComponent.scss';
import { observableConnect, ObservableStateToProps, MapState$ } from '../../utils';
import { TodoModel } from '../../models';
import TodoButton from '../todo-button/TodoButtonComponent';
import TableRow from '../todo-table/TableRowComponent';


type OwnProps = {
  model: TodoModel;
}
type Props = OwnProps & ObservableStateToProps<typeof mapStateToProps>;

// @bindable<string>((self) => self.model.pipe(
//     first(),
//     switchMap(({ done }) => merge(
//       of(done ? 'green' : 'red'),
//       of('').pipe(delay(500)),
//     )),
//   ))
//   newRowBackgroundColor!: Bindable<string>;

const mapStateToProps = (state$: MapState$, props: OwnProps) => ({
  newRowBackgroundColor: state$.pipe(
    map(([, props]) => props.model),
    first(),
    map(model => model.done ? 'green' : 'red')
  )
});

class EditableTableRowComponent extends React.Component<Props> {

  render() {
    const { model, newRowBackgroundColor } = this.props;
    return (
      <div className={ `editable-table-row-container ${newRowBackgroundColor}` }
           data-bind-class="{ 'edit-mode': 'editMode', 'edit-mode-popup': 'editModeAnimate' }"
           data-bind-class-name="newRowBackgroundColor">

        <TableRow model={model}
                  data-bind-clicked="rowClicked"/>

      </div>
    )
  }
}

export default observableConnect(
  mapStateToProps
)(EditableTableRowComponent);
