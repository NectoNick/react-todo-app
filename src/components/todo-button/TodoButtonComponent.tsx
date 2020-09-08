import * as React from 'react';

import './TodoButtonComponent.scss';


type OwnProps = {
  label: string;
  clicked: () => void;
  className?: string;
}
type Props = OwnProps // & ObservableStateToProps<typeof mapStateToProps>;

// const mapStateToProps = (state$: MapState$, props: OwnProps) => ({
//   lightMode: state$.pipe(map(([state]) => { debugger; return state.lightMode })),
//   lightMode1: state$.pipe(map(([state]) => { debugger; return 'state.lightMode' })),
// });

export default class TodoButtonComponent extends React.Component<Props> {

  readonly state = {};

  render() {
    return (
      <button className={ `button ${this.props.className}` }
              onClick={ this.props.clicked }>
        { this.props.label }
      </button>
    )
  }
}

// export default observableConnect(
//   mapStateToProps
// )(TodoButtonComponent);

// const mapStateToProps = (state$: any) => ({
//   lightMode: 'state$.pipe(map(state => { debugger; return state.lightMode }))',
//   lightMode1: 'state$.pipe(map(state => { debugger; return state.lightMode }))',
// });

// export default connect(
//   (state: RootState, a: any) => ({ darkMode: state.darkMode }),
// )(TodoButtonComponent);
