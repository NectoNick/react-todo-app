// import * as React from 'react';
// import { map } from 'rxjs/operators';
//
// import './TodoButtonComponent.scss';
// import { observableConnect, ObservableStateToProps } from '../../utils';
// import { RootState, RootState$ } from '../../store/root-state';
// import { connect } from 'react-redux';
//
//
// type Props = {
//   label: string;
//   clicked: () => void;
// } & Partial<ObservableStateToProps<typeof mapStateToProps>>;
// // } & Partial<ReturnType<typeof mapStateToProps>>;
//
// const mapStateToProps = (state$: RootState$) => ({
//   lightMode: state$.pipe(map(state => { /*debugger; */return state.lightMode })),
// });
//
// // const mapStateToProps = (state: RootState) => {
// //   debugger;
// //   return {
// //     lightMode: state.lightMode
// //   }
// // };
//
// @observableConnect(mapStateToProps)
// export default class TodoButtonComponent extends React.Component<Props & React.HTMLAttributes<HTMLDivElement>> {
//
//   render() {
//     const { lightMode } = this.props;
//     return (
//       <button className={ `button ${'this.props.className'}` }
//               onClick={ this.props.clicked }>
//         { this.props.label } { lightMode ? 'sdfsdf' : 'dfsdfsdfsdf'}
//       </button>
//     )
//   }
// }
//
// // export default connect(
// //   mapStateToProps,
// // )(TodoButtonComponent)
export {}
