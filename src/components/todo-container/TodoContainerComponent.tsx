import * as React from 'react';
import { connect} from 'react-redux';
import { createSelector } from 'reselect';

import './TodoContainerComponent.scss';
import { RootState } from '../../store/root-state';
import { switchMode } from '../../store/root-actions';
import { createTodo, removeTodos } from '../../store/modules/todo/actions';
import * as selectors from '../../store/modules/todo/selectors';
import { FormInputModel, TodoModel } from '../../models';
import TodoButton from '../todo-button/TodoButtonComponent';
import TableCaption from '../table-caption/TableCaptionComponent';
import TodoTable from '../todo-table/TodoTableComponent';
import Badge from '../todo-badge/TodoBadgeComponent';
import Form from '../form/FormComponent';


type OwnProps = {
  className?: string;
}
type Props = OwnProps & ReturnType<typeof mapStateToProps> & typeof mapActionsToProps;
type TodoForm = [FormInputModel<keyof TodoModel>, FormInputModel<keyof TodoModel>]
type State = {
  todo: TodoModel;
}

const getTodoForm = createSelector(
  (todo: TodoModel) => todo,
  (todo): TodoForm => [
    { type: 'text', label: 'Description', value: todo.description, name: 'description' },
    { type: 'checkbox', label: 'Is done', value: todo.done, name: 'done' }
  ]
);

const mapStateToProps = ({ darkMode, todo }: RootState, props: OwnProps) => {
  return {
    darkMode: darkMode,
    todoList: selectors.getTodoList(todo),
    todoListTotal: selectors.getTodoListTotal(todo),
    todoListDone: selectors.getTodoListDone(todo),
    todoListLeft: selectors.getTodoListLeft(todo),
  };
};

const mapActionsToProps = {
  switchMode,
  createTodo,
  removeTodos
};

class TodoContainerComponent extends React.Component<Props, State> {

  readonly defaultTodo = {
    description: '',
    done: false,
    date: null
  };

  readonly state = {
    todo: { ...this.defaultTodo }
  };

  createTodo = (): void => {
    this.props.createTodo(this.state.todo);
    this.setState({ todo: { ...this.defaultTodo } });
  };

  changeTodo = (partialTodo: Partial<TodoModel>): void => {
    this.setState({ todo: { ...this.state.todo, ...partialTodo } });
  };

  render() {
    const { darkMode, todoListTotal, todoList, todoListDone, todoListLeft, switchMode, removeTodos } = this.props;
    return (
      <div className={ `container ${ darkMode ? 'dark' : '' }` }>

        <TodoButton className="top-button"
                    label="Click to change background"
                    clicked={ switchMode }
        />

        <TableCaption count={ todoListTotal } />

        {
          !todoListTotal
            ? <div className="table-placeholder">Nothing to show</div>
            : <div className="table-section">
                <div className="side-area"></div>
                <div className="center-area">
                  <TodoTable rows={ todoList }
                             data-bind-updated="todoUpdated"
                  />
                </div>
                <div className="counters side-area">
                  <div>
                    Done: <Badge className="green"
                                 count={ todoListDone }
                          />
                  </div>
                  <div>
                    Left: <Badge className="red"
                                 count={ todoListLeft }
                          />
                  </div>
                </div>
              </div>
        }

        <Form model={ getTodoForm(this.state.todo) }
              changed={ this.changeTodo }
        />

        <TodoButton className="todo-button"
                    label="Create"
                    clicked={ this.createTodo }
        />

        {
          !!todoListTotal &&
          <TodoButton className="todo-button"
                      label="Remove all"
                      clicked={ removeTodos }
          />
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TodoContainerComponent)
