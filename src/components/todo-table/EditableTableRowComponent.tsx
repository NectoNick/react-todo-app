import * as React from 'react';
import { Primitive } from 'utility-types';

import './EditableTableRowComponent.scss';
import { FormModel } from '../../models';
import { TableRowModel } from './TableRowComponent';
import Button from '../button/ButtonComponent';
import TableRow from '../todo-table/TableRowComponent';
import Form from '../form/FormComponent';


export type EditMode = boolean;
export interface EditableTableRowModel<T extends object = object> {
  row: TableRowModel<T>,
  form: FormModel
}

type ChangedRow = Record<string, Primitive>;

type OwnProps = {
  model: EditableTableRowModel;
  editMode: EditMode;
  clicked: (editMode: EditMode) => void;
  rowChanged: (changedRow: ChangedRow) => void;
  rowRemoved: () => void;
};

export default class EditableTableRowComponent extends React.Component<OwnProps> {

  render() {
    const { model, editMode, clicked, rowChanged, rowRemoved } = this.props;
    return (
      <div className={ `editable-table-row-container ${editMode ? 'edit-mode' : ''}` }>

        <TableRow model={ model.row }
                  clicked={ () => clicked(!editMode) }
        />

        {
          !!editMode &&
          <div className={ `edit-section w-m-a w-f-a ${editMode ? 'bigger' : 'smaller'}` }>
            <Form id="editable-row-form"
                  className="no-label"
                  model={ model.form }
                  submit={ rowChanged }>
            </Form>
            <div className="buttons-container">
              <Button form="editable-row-form"
                      type="submit"
                      className="popup-button"
                      label="Save">
                <img alt=""
                     title="Save"
                     className="popup-button-icon save-icon"
                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAABmJLR0QA/wD/AP+gvaeTAAABdElEQVRoge2aT07CQBSHv3YBCUvdaIBT6TEMJ8KdHkG8AcqqxgWJ8RZCdFkXpag4r52pDX0d35e8Vfsyv6/Qf9OBL4bADHgEtkCupN6BB+CCAMbAk4LwdXUNjOpkhp4yd8Ak5Cj9kQmwcORYASdVjTNHk6uOKVMyFbI8A2dS00poOqy28R1H2u+FQvgXm4omzUI58AqchzRoFyr/fqchDdqFygvFKKRBu1AOzAGSgLBJ8+xOpHEPxwk5mJexCS1jE/qITYi0WRa9mJB2TEg7IUJtvz4kQn3H+TRdh++jxaLpAA2ZAvcB+XIgD7kP9YJ/fQ71AhPSTnRCIF8Cjz0P54s0X7d/45U2aJQpkebrKu9Dbb//tI0zd3TnkAlpx4S0Y0LaMSHtmJB2TEg7JqQdE9JOSrHyKhbeUmDddYoWWafAjbBR+ySJi1solpdldP+1wRfpq0QGDMqdxril+lLZzuEHA+CKYjmk7wqtLmsDLHeZ97/MJ7CHmP8UEGCRAAAAAElFTkSuQmCC"
                />
              </Button>

              <Button className="popup-button"
                      label="Delete"
                      type="button"
                      clicked={ rowRemoved }>
                <img alt=""
                     title="Delete"
                     className="popup-button-icon"
                     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA2UlEQVRIie2UvQ3CMBCFv1AANYUlZsgIgJQWMREdJfOAmCBQQccG0LEAVQhFDsk4ZzAmBQKedIruOX7Pd/6BX8EMKJ2Yx4ptFLHQyF2xlmJwiV2ZmHwZEg8fW2pNT9uDRhFiMABGCp95+DuEtChROB//mS36G7yNKdAHetpgE6foIZpq0RrYAUZyI3ntdb3BfoI1zq1mJ9weSOVbAtsQg4zqxroGQ+t/Y4kWlpnBg6MiqMUS6Mic1BIvJPdiDByeiC+AdmwFr8K7B0FHLQA50AUmwIlq5SvgfAXJvV8ICi52JAAAAABJRU5ErkJggg=="
                />
              </Button>

            </div>
          </div>
        }
      </div>
    );
  }
}
