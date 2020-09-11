import * as React from 'react';

import './TableRowComponent.scss';


export interface TableRowModel<T extends object = object> {
  className?: 'red' | 'green',
  cells: T
}

interface OwnProps {
  model: TableRowModel;
  className?: string;
  clicked?: () => void;
}

export default function TableRowComponent({ model, clicked, className = '' }: OwnProps) {
  return (
    <div className={ `table-row ${className} ${model.className || ''}` }
         onClick={ clicked }>
      {
        Object.entries(model.cells).map(([cellName, cell]) =>
          <div className="cell"
               key={ cellName }>
            <p>{ cell }</p>
          </div>
        )
      }
    </div>
  );
}
