import * as React from 'react';

import './ButtonComponent.scss';


type OwnProps = {
  form?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  label: string;
  clicked?: () => void;
  className?: string;
  children?: unknown;
}

export default function ButtonComponent({ form, type, className, label, clicked, children }: OwnProps) {
  return (
    <button form={ form }
            type={ type }
            className={ `button ${className}` }
            onClick={ clicked }>
      <span className="button-label">{ label }</span>
      { children }
    </button>
  );
}
