import * as React from 'react';

import './TableCaptionComponent.scss';
import Badge from '../badge/BadgeComponent';


type OwnProps = {
  count: number;
}

const getEnding = (count: OwnProps['count']) => count === 1 ? '' : 's';

export default function TableCaptionComponent({ count }: OwnProps) {
  return (
    <div className="table-caption">
      <span className="padding-right-5">You have</span>
      <span>
        <Badge className="blue caption-badge"
               count={ count }
        />
        TODO{ getEnding(count) }</span>
    </div>
  )
}
