import * as React from 'react';


interface Props {
  label: string;
  clicked: () => void;
}

export default (props: Props & React.HTMLAttributes<HTMLDivElement>) => {
  debugger;
  return (
    <button className="button"
            onClick={ props.clicked }>
      { props.label }
    </button>
  )
}

