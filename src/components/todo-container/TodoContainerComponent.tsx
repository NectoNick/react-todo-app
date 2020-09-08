import * as React from 'react';
import { connect, MapDispatchToProps } from 'react-redux';
import { BehaviorSubject, combineLatest, merge, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, map, withLatestFrom } from 'rxjs/operators';

import './TodoContainerComponent.scss';

import { switchMode } from '../../store/root-actions';
import { addTodo } from '../../store/modules/todo/actions';
import { observableConnect, ObservableStateToProps, MapState$ } from '../../utils';
import TodoButton from '../todo-button/TodoButtonComponent';
import TableCaption from '../table-caption/TableCaptionComponent';
import TodoTable from '../todo-table/TodoTableComponent';
import TodoBadge from '../todo-badge/TodoBadgeComponent';


type OwnProps = {
  className?: string;
}

type Props = OwnProps & ObservableStateToProps<typeof mapStateToProp> & typeof mapActionsToProps;

const mapStateToProp = (state$: MapState$, props: OwnProps) => {
  const todoList = state$.pipe(
    map(([{ todo: { todos } }]) => todos),
    distinctUntilChanged()
  );
  const todoListTotal = todoList.pipe(map(({ length }) => length));
  const todoListDone = todoList.pipe(map(list => list.filter(({ done }) => done).length));

  return {
    darkMode: state$.pipe(map(([state]) => state.darkMode)),
    lightMode: state$.pipe(map(([state]) => state.lightMode)),
    todoList,
    todoListTotal,
    todoListDone,
    todoListLeft: todoList.pipe(
      withLatestFrom(todoListTotal, todoListDone),
      map(([, total, done]) => total - done),
    )
  };
};

const mapActionsToProps = {
  switchMode,
  addTodo
};

class TodoContainerComponent extends React.Component<Props> {

  switchMode = () => {
    // debugger
    this.props.switchMode();
  };

  addTodo(): void {
    // this.setState({ todos: 1 });
    this.props.addTodo({
      description: '',
      done: false,
      removed: false
    })
  }

  render() {
    const { darkMode, todoListTotal, todoList, todoListDone, todoListLeft } = this.props;

    return (

      <div className={ `container ${ darkMode ? 'dark' : '' }` }>

        <TodoButton className="top-button"
                    label={ 'Click to change background 1' }
                    clicked={ () => this.switchMode() }
        />

        <TableCaption count={ todoListTotal } />

        { !todoListTotal && <div className="table-placeholder">Nothing to show</div> }


        <div className="table-section"
             data-bind-if="todoListTotal">
          <div className="side-area"></div>
          <div className="center-area">
            <TodoTable rows={ todoList }
                       data-bind-updated="todoUpdated"
            />
          </div>
          <div className="counters side-area">
            <div>
              Done: <TodoBadge count={ todoListDone } />
            </div>
            <div>
              Left: <TodoBadge className="red"
                               count={ todoListLeft }
                    />
            </div>
          </div>
        </div>

        {/*<todo-form data-bind-model="todoForm"
                   data-bind-changed="todoFormChanged">
        </todo-form>*/}

        <TodoButton className="todo-button"
                    label={'Create'}
                    clicked={ () => { this.addTodo() /*createTodoButtonClicked*/ }}
        />

        {
          todoListTotal &&
          <TodoButton className="todo-button"
                      label={ 'Remove all' }
                      clicked={ () => { /*removeAllButtonClicked*/ } }
          />
        }
      </div>
    );
  }
}

export default observableConnect(
  mapStateToProp,
  mapActionsToProps
)(TodoContainerComponent)


// const mapStateToProps = (state: RootState, props: OwnProps) => {
//   debugger
//   return {
//     darkMode: state.darkMode,
//     lightMode: state.lightMode,
//     todoList: state.todo.todos
//   }
// };

// export default connect(
//   mapStateToProps,
//   mapActionsToProps
// )(TodoContainerComponent);

// type ObservableProps = Record<string, Observable<unknown>>;
//
// function observableConnect(
//   mapObservableStateToProps: (state$: Observable<RootState>) => ObservableProps
// ): (state: RootState, props: any) => any {
//   const state$: Subject<RootState> = new Subject();
//   const observableProps: ObservableProps = mapObservableStateToProps(state$.asObservable());
//   const observablePropsKeys = Object.keys(observableProps);
//   let result: any = {};
//   combineLatest(Object.values(observableProps)).subscribe((values) => {
//     result = values.reduce((acc: any, value, index) => {
//       return { ...acc, [observablePropsKeys[index]]: value };
//     }, {});
//   });
//
//   return (state: RootState, props: any) => {
//     state$.next(state);
//     return result;
//   }
// }

// const mapStateToProps = (state: RootState, a: any) => {
//   return {
//     darkMode: state.darkMode,
//   };
// };
//
// const cClass = connect(
//   mapStateToProps,
//   mapActionsToProps
// )(TodoContainerComponent);
//
// export default cClass;
