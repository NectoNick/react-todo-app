import * as React from 'react';
import { connect} from 'react-redux';

import './TodoContainerComponent.scss';
import { RootState } from '../../store/root-state';
import { switchMode } from '../../store/root-actions';
import { createTodo, removeTodos } from '../../store/modules/todo/actions';
import * as selectors from '../../store/modules/todo/selectors';
import { TodoModel, FormTodoModel } from '../../models';
import { createTodoForm } from '../../utils';
import Button from '../button/ButtonComponent';
import TableCaption from '../table-caption/TableCaptionComponent';
import TodoTable from '../todo-table/TodoTableComponent';
import Form from '../form/FormComponent';
import { useState } from 'react';


type Props = ReturnType<typeof mapStateToProps> & typeof mapActionsToProps;

const getForm = createTodoForm();

const mapStateToProps = ({ darkMode, todo }: RootState) => {
  return {
    todoListTotal: selectors.getTodoListTotal(todo),
  };
};

const mapActionsToProps = {
  switchMode,
  createTodo,
  removeTodos
};

function TodoContainerComponent({ todoListTotal, switchMode, removeTodos, createTodo }: Props) {

  const defaultInputs = {
    description: '',
    done: false
  };

  const [defaultInputsState, setTodo] = useState(defaultInputs);

  const submitForm = (todo: FormTodoModel): void => {
    createTodo(todo);
    setTodo(defaultInputs);
  };

  return (
    <div className="todo-root-container">

      <Button className="top-button"
              label="Click to change background"
              clicked={ switchMode }
      />

      <TableCaption count={ todoListTotal } />

      {
        !todoListTotal
          ? <div className="todo-table-placeholder">Nothing to show</div>
          : <TodoTable />
      }

      <Form id="create-todo-form"
            model={ getForm(defaultInputsState) }
            submit={ (todo: Partial<TodoModel>) => submitForm(todo as FormTodoModel) }
      />

      <Button className="todo-button"
              label="Create"
              form="create-todo-form"
              type="submit"
      />

      {
        !!todoListTotal && <Button className="todo-button"
                                   label="Remove all"
                                   clicked={ removeTodos }
                           />
      }
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TodoContainerComponent)
