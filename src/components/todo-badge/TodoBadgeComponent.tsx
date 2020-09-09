import * as React from 'react';
import { createCachedSelector } from 're-reselect';

import './TodoBadgeComponent.scss';


type OwnProps = {
  count: number;
  className?: string;
}

const getAnimationClass = createCachedSelector(
  (count: OwnProps['count'], casheKey: string) => count,
  count => count % 2 === 0 ? 'animation' : 'nextAnimation' // this small hack is need to rerun animation
)((s, name) => name);

export default function TodoBadgeComponent({ count, className = 'blue' }: OwnProps) {
  return (
    <span className="badge-container">
      {/*className used here as a unique key for cashing selector but it is unsafe and must be changed when it will be need*/}
      <span className={ `badge ${getAnimationClass(count, className)} ${className}` }>
        { count }
      </span>
    </span>
  );
}
