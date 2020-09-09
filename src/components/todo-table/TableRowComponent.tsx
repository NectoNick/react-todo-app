import * as React from 'react';
import { connect } from 'react-redux';

import './TableRowComponent.scss';
import { TodoModel } from '../../models';
import { DateFormatService } from '../../utils';
import { createSelector } from 'reselect';
import { RootState } from '../../store/root-state';


interface TodoRowModel {
  description: TodoModel['description'];
  done: 'yes' | 'no',
  date: string,
}
type OwnProps = {
  model: TodoModel;
}
type Props = OwnProps & ReturnType<ReturnType<typeof mapStateToProps>>;

const getRowModel = createSelector(
  ({ model }: OwnProps) => model,
  ({ description, done, date }): TodoRowModel => ({
    description,
    done: done ? 'yes' : 'no',
    date: date ? DateFormatService.getDate(date) : ''
  })
);

// const getRowModelFactory = () => createSelector(
//   ({ model }: OwnProps) => model,
//   ({ description, done, date }): TodoRowModel => ({
//     description,
//     done: done ? 'yes' : 'no',
//     date: date ? DateFormatService.getDate(date) : ''
//   })
// );

const mapStateToProps = () => {
  // const getRowModell = getRowModelFactory();

  return (state: RootState, props: OwnProps) => ({
    // rowModel: getRowModell(props)
  });
};

class TableRowComponent extends React.Component<Props> {

  render() {
    const rowModel = getRowModel(this.props);

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

export default connect(
  mapStateToProps
)(TableRowComponent);
