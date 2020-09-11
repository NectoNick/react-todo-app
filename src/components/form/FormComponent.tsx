import * as React from 'react';
import { Primitive } from 'utility-types';

import './FormComponent.scss';
import { FormModel } from '../../models';
import { FormInputModel } from '../../models';
import { FormEvent } from 'react';


type InputAsObject = Record<string, Primitive>;

type Props = {
  id?: string;
  model: FormModel;
  className?: string;
  changed?: (inputAsObject: InputAsObject, formAsObject: InputAsObject, form: FormModel) => void;
  submit?: (formAsObject: InputAsObject, form?: FormModel) => void;
};

export default class FormComponent extends React.Component<Props> {

  readonly state = this.getState();

  getState() {
    return {
      asObject: this.props.model.reduce((acc, { name, value }) => ({ ...acc, [name]: value }), {}),
      asArray: [...this.props.model]
    };
  }

  componentDidUpdate(prevProps: Readonly<Props>): void {
    if (prevProps.model !== this.props.model) {
      this.setState(this.getState());
    }
  }

  changed = (inputModel: FormInputModel): void => {
    const changedInput = { [inputModel.name]: inputModel.value };
    const asObject = { ...this.state.asObject, ...changedInput };
    const asArray = this.state.asArray.map(input => input.name === inputModel.name ? inputModel : input);
    this.setState({ asObject, asArray });
    // this.props.changed?.(changedInput, asObject, asArray);
    this.props.changed && this.props.changed(changedInput, asObject, asArray);
  };

  submit = (): void => {
    // this.props.submit?.(changedInput, asObject, asArray);
    this.props.submit && this.props.submit(this.state.asObject, this.state.asArray);
  };

  render() {
    const { id, className } = this.props;
    return (
      <form id={ id }
            className={ `form ${className}` }
            onSubmit={ (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); this.submit() } }>
        {
          this.state.asArray.map((input) =>
            <label key={ input.name }>
              <span className="label">{ input.label }:</span>
              {
                input.type === 'checkbox'
                  ? <input type={ input.type }
                           checked={ input.value }
                           onChange={(e) => this.changed({ ...input, value: e.target.checked }) } />
                  : <input type={ input.type }
                           value={ input.value }
                           onChange={(e) => this.changed({ ...input, value: e.target.value }) } />
              }
            </label>
          )
        }
      </form>
    );
  }
}
