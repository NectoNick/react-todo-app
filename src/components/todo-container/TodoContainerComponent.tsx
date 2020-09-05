import * as React from 'react';
import { connect } from 'react-redux';

import './TodoContainerComponent.scss';

import TodoButton from '../todo-button/TodoButtonComponent';
import { switchMode } from '../../store/root-actions';


type Props = typeof mapActionsToProps;

interface State {
  mode: boolean;
}

const mapActionsToProps = {
  switchMode
};

class AddTodoForm extends React.Component<Props, State> {
  readonly state = { mode: false };

  handleTitleChange: React.ReactEventHandler<HTMLInputElement> = (ev) => {
    this.setState({ mode: /*ev.currentTarget.value*/ false });
  };

  switchMode = () => {
    this.props.switchMode();
    // this.setState({ title: '' });
  };

  render() {
    // const { title } = this.state;

    return (

      <div className="container"
           data-bind-class="{ 'dark': 'isDarkMode' }">

        <TodoButton className="top-button"
                    label={'Click to change background'}
                    clicked={() => this.switchMode()}
        />

        {/*<todo-table-caption data-bind-count="todoListTotal"></todo-table-caption>

        <div className="table-placeholder"
             data-bind-if="!todoListTotal">
          Nothing to show
        </div>

        <div className="table-section"
             data-bind-if="todoListTotal">
          <div className="side-area"></div>
          <todo-table className="center-area"
                      data-bind-rows="todoList"
                      data-bind-updated="todoUpdated">
          </todo-table>
          <div className="counters side-area">
            <div>
              Done: <todo-badge data-bind-count="todoListDone"></todo-badge>
            </div>
            <div>
              Left: <todo-badge data-bind-add-class="'red'"
                                data-bind-count="todoListLeft">
            </todo-badge>
            </div>
          </div>
        </div>

        <todo-form data-bind-model="todoForm"
                   data-bind-changed="todoFormChanged">
        </todo-form>

        <todo-button data-bind-label="'Create'"
                     data-bind-clicked="createTodoButtonClicked">
        </todo-button>

        <todo-button data-bind-if="todoListTotal"
                     data-bind-label="'Remove all'"
                     data-bind-clicked="removeAllButtonClicked">
        </todo-button>*/}
      </div>
    );
  }
}

export default connect(
  null,
  mapActionsToProps

)(AddTodoForm);
