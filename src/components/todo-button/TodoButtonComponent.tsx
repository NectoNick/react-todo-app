import * as React from 'react';

import './TodoButtonComponent.scss';


type OwnProps = {
  label: string;
  clicked: () => void;
  className?: string;
}

export default function TodoButtonComponent({ className, label, clicked }: OwnProps) {
  return (
    <button className={ `button ${className}` }
            onClick={ clicked }>
      { label }
    </button>
  );
}
