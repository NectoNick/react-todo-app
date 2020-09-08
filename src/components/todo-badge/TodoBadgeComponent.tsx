import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import './TodoBadgeComponent.scss';
import { RootState } from '../../store/root-state';


type OwnProps = {
  count: number;
  className?: string;
}
type Props = OwnProps & ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: RootState, ownProps: OwnProps) => {
  const animationClassSelector = createSelector(
    (props: OwnProps) => props.count,
    count => count % 2 === 0 ? 'animation' : 'nextAnimation' // this small hack is need to rerun animation
  );
  return {
    animationClass: animationClassSelector(ownProps)
  };
};

function TodoBadgeComponent({ count, animationClass, className }: Props) {
  return (
    <span className="badge-container">
      <span className={ `badge ${animationClass} ${className}` }
            data-bind-class-name="addedClass">
        { count }
      </span>
    </span>
  );
}

export default connect(
  mapStateToProps
)(TodoBadgeComponent);
