import * as React from 'react';
import { Primitive } from 'utility-types';

import './FormComponent.scss';
import { FormModel } from '../../models';
import { FormInputModel } from '../../models';


type FormOutputModel = Record<string, Primitive>

type Props = {
  model: FormModel;
  changed: (formOutputModel: FormOutputModel) => void;
};

export default class AddTodoForm extends React.Component<Props> {

  handleAddClick = (inputModel: FormInputModel) => {
    this.props.changed({ [inputModel.name]: inputModel.value });
  };

  render() {
    return (
      <form>
        {
          this.props.model.map((input) =>
            <label key={ input.name }>
              <span className="label">{ input.label }:</span>
              {
                input.type === 'checkbox'
                  ? <input type={ input.type }
                           checked={ input.value }
                           onChange={(e) => this.handleAddClick({ ...input, value: e.target.checked }) } />
                  : <input type={ input.type }
                           value={ input.value }
                           onChange={(e) => this.handleAddClick({ ...input, value: e.target.value }) } />
              }
            </label>
          )
        }
      </form>
    );
  }
}
