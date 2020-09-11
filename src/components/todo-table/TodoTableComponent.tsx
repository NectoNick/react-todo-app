import * as React from 'react';
import { connect } from 'react-redux';
import { createCachedSelector } from 're-reselect';
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import './TodoTableComponent.scss';
import { RootState } from '../../store/root-state';
import * as selectors from '../../store/modules/todo/selectors';
import { updateTodo, removeTodo } from '../../store/modules/todo/actions';
import { createTodoForm, DateFormatService, usePrev } from '../../utils';
import { TodoModel, FormTodoModel } from '../../models';
import EditableTableRow, { EditableTableRowModel, EditMode } from './EditableTableRowComponent';
import TableRow from './TableRowComponent';
import Badge from '../badge/BadgeComponent';


interface RowModel {
  description: TodoModel['description'];
  done: 'yes' | 'no',
  date: string,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapActionsToProps;

const form = createTodoForm(true);

const getRowModel = createCachedSelector(
  (todo: TodoModel) => todo,
  ({ description, done, date, id }): EditableTableRowModel<RowModel> => ({
    row: {
      className: done ? 'green' : 'red',
      cells: {
        description,
        done: done ? 'yes' : 'no',
        date: date ? DateFormatService.getDate(date) : ''
      }
    },
    form: form({ description, done }, id)
  })
)((t) => t.id);

const mapStateToProps = ({ todo }: RootState) => {
  return {
    todoList: selectors.getTodoList(todo),
    todoListDone: selectors.getTodoListDone(todo),
    todoListLeft: selectors.getTodoListLeft(todo),
  };
};

const mapActionsToProps = {
  updateTodo,
  removeTodo
};

function TodoTableComponent({ todoList, todoListDone, todoListLeft, updateTodo, removeTodo }: Props) {
  const tableElementRef = useRef(null);
  const computeEditModes: EditMode[] = useMemo(() => todoList.map(() => false), [todoList]);
  const [editModes, setEditModes] = useState(computeEditModes);

  const changeMode = (rowIndex: number | null, editMode: EditMode): void => {
    const editModes = computeEditModes.map((mode, index) => rowIndex === index ? editMode : mode);
    setEditModes(editModes);
  };

  const changeRow = (id: string, todo: FormTodoModel): void => {
    updateTodo({ id, todo });
  };

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!(tableElementRef.current! as any).contains(e.target)) {
        changeMode(null, false)
      }
    },
    [tableElementRef.current],
  );

  useEffect(() => {
    document.addEventListener('click', clickListener);
    return () => document.removeEventListener('click', clickListener);
  }, []);

  const prevTodoList = usePrev(todoList) || [];

  useLayoutEffect(() => {
    changeMode(null, false);
    if (prevTodoList.length < todoList.length) {
      // next line is preferable, but that syntax is not supported by online editor
      // tableElementRef.current?.lastElementChild?.scrollIntoView(false);
      const element: any = tableElementRef.current || {};
      element.lastElementChild && element.lastElementChild.scrollIntoView(false);
    }
  }, [todoList]);

  return (
    <div className="todo-table-section">
      <div className="side-area"></div>
      <div className="center-area">
        <div className="todo-table-container"
             ref={ tableElementRef }>

          <div className="todo-table">

            <TableRow className="heading"
                      model={ { cells: { d: 'Description', i: 'Is Done', c: 'Created' } } }
            />

            {
              todoList.map((todo, index) =>
                <EditableTableRow key={ todo.id }
                                  model={ getRowModel(todo) }
                                  editMode={ editModes[index] }
                                  clicked={ (mode: EditMode) => changeMode(index, mode) }
                                  rowChanged={ (changed) => changeRow(todo.id, changed as FormTodoModel) }
                                  rowRemoved={ () => removeTodo(todo.id) }
                />
              )
            }
          </div>

        </div>
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
  );
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TodoTableComponent);


// const getEditModes = createSelector(
//   ({ todoList }: Props) => todoList,
//   (todoList) => todoList.map(() => false)
// );
//
// class TodoTableComponent extends React.Component<Props, State> {
//
//   readonly state = {
//     editModes: getEditModes(this.props)
//   };
//
//   tableElementRef = React.createRef<HTMLDivElement>();
//
//   changeMode = (rowIndex: number | null, editMode: EditMode): void => {
//     const editModes = getEditModes(this.props).map((mode, index) => rowIndex === index ? editMode : mode);
//     this.setState({ editModes });
//   };
//
//   changeRow = (id: string, todo: FormTodoModel): void => {
//     this.props.updateTodo({ id, todo })
//   };
//
//   componentDidUpdate({ todoList }: Props): void {
//     if (todoList !== this.props.todoList) {
//       this.setState({ editModes: getEditModes(this.props) });
//       if (todoList.length < this.props.todoList.length) {
//         // next line is preferable, but that syntax is not supported but online editor
//         // this.rootElementRef.current?.lastElementChild?.scrollIntoView(false);
//         ((this.tableElementRef.current || {}).lastElementChild || {} as any).scrollIntoView(false);
//       }
//     }
//   }
//
//   render() {
//     const { todoListDone, todoListLeft, removeTodo } = this.props;
//     const { editModes } = this.state;
//     return (
//       <div className="todo-table-section">
//         <div className="side-area"></div>
//         <div className="center-area">
//           <div className="todo-table-container"
//                ref={ this.tableElementRef }>
//
//             <div className="todo-table">
//
//               <TableRow className="heading"
//                         model={ { cells: { d: 'Description', i: 'Is Done', c: 'Created' } } }
//               />
//
//               {
//                 this.props.todoList.map((todo, index) =>
//                   <EditableTableRow key={ todo.id }
//                                     model={ getRowModel(todo) }
//                                     editMode={ editModes[index] }
//                                     clicked={ (mode: EditMode) => this.changeMode(index, mode) }
//                                     rowChanged={ (changed) => this.changeRow(todo.id, changed as FormTodoModel) }
//                                     rowRemoved={ () => removeTodo(todo.id) }
//                   />
//                 )
//               }
//             </div>
//
//           </div>
//         </div>
//
//         <div className="counters side-area">
//           <div>
//             Done: <Badge className="green"
//                          count={ todoListDone }
//                   />
//           </div>
//           <div>
//             Left: <Badge className="red"
//                          count={ todoListLeft }
//                   />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapActionsToProps
// )(TodoTableComponent);
