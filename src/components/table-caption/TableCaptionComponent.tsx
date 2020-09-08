import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import './TableCaptionComponent.scss';
import { RootState } from '../../store/root-state';
import Badge from '../todo-badge/TodoBadgeComponent';


type OwnProps = {
  count: number;
}
type Props = OwnProps & ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const endingSelector = createSelector(
    (props: OwnProps) => props.count,
    count => count === 1 ? '' : 's'
  );
  return {
    ending: endingSelector(ownProps)
  };
};

function TableCaptionComponent({ count, ending }: Props) {
  return (
    <div className="table-caption">
      <span className="padding-right-5">You have</span>
      <span>
        <Badge className="blue"
               count={ count } />
        TODO{ ending }</span>
    </div>
  )
}

export default connect(
  mapStateToProps
)(TableCaptionComponent);
