import * as React from 'react';
import { distinctUntilChanged, distinctUntilKeyChanged, map, pairwise, scan, startWith, tap } from 'rxjs/operators';

import './TableRowComponent.scss';
import { TodoModel } from '../../models';
import { MapState, MapState$, observableConnect, ObservableStateToProps, DateFormatService } from '../../utils';


interface TodoRowModel {
  description: TodoModel['description'];
  done: 'yes' | 'no',
  date: string,
}

type OwnProps = {
  model: TodoModel;
}
type Props = OwnProps & ObservableStateToProps<typeof mapStateToProps>;

const mapStateToProps = (state$: MapState$, props: OwnProps) => ({
  rowModel: state$.pipe(
    // startWith<any>([]),
    // pairwise(),
    // tap(val => {debugger}),
    // map(([prev, curr]) => curr),
    map<MapState, TodoModel>(([, props]) => props.model),

    distinctUntilChanged(),
    startWith<any>({}),
    pairwise<any>(),
    tap(([prev, next]) => {debugger}),
    //distinctUntilKeyChanged('done'),
    // scan((b, b1) => { debugger; return b1; }),
    // tap(val => {debugger}),
    map(([prev, next]) => next),
    map<TodoModel, TodoRowModel>(({ description, done, date }) => ({
      description,
      done: done ? 'yes' : 'no',
      date: date ? DateFormatService.getDate(date) : ''
    })),
  )
});

class TableRowComponent extends React.Component<Props> {

  render() {
    const { rowModel } = this.props;
    return (
      <div className="table-row"
           data-bind-click="rowClicked">
        <div className="cell">
          <p>{ rowModel.description }</p>
        </div>
        <div className="cell">
          <p>{ rowModel.done }</p>
        </div>
        <div className="cell">
          <p>{ rowModel.date }</p>
        </div>
      </div>
    );
  }
}

export default observableConnect(
  mapStateToProps
)(TableRowComponent);
