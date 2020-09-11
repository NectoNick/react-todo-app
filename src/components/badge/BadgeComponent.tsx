import * as React from 'react';
import { createCachedSelector } from 're-reselect';

import './BadgeComponent.scss';


type OwnProps = {
  count: number;
  className?: string;
}

const getAnimationClass = createCachedSelector(
  (count: OwnProps['count'], casheKey: string) => count,
  count => count % 2 === 0 ? 'animation' : 'rerunAnimation' // this small hack is need to rerun animation
)((s, name) => name);

export default function BadgeComponent({ count, className = 'blue' }: OwnProps) {
  return (
    // className used here as a unique key for cashing selector but it is unsafe and must be changed when it will be need
    <span className={ `badge-container ${getAnimationClass(count, className)} ${className}` }>
      { count }
    </span>
  );
}
