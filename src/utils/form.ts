import { createSelector, OutputSelector } from 'reselect';
import { FormInputModel, FormTodoModel } from '../models';
import createCachedSelector from 're-reselect';
import { Primitive } from 'utility-types';


type GetFormFor<T extends { [key: string]: Primitive }> = (src: T) => Array<FormInputModel<keyof T>>;
type BaseState = Record<string, Primitive>;

export function createForm<FS extends BaseState>(formState: GetFormFor<FS>, cache: false): OutputSelector<FS, ReturnType<GetFormFor<FS>>, GetFormFor<FS>>
export function createForm<FS extends BaseState>(formState: GetFormFor<FS>, cache: true): (param: FS, cKey: string) => ReturnType<GetFormFor<FS>>
export function createForm<FS extends BaseState>(
  form: GetFormFor<FS>,
  cache: boolean
): OutputSelector<FS, ReturnType<GetFormFor<FS>>, GetFormFor<FS>> | ((param: FS, cKey: string) => ReturnType<GetFormFor<FS>>) {
  return !cache
    ? createSelector((formState: FS) => formState, form)
    : createCachedSelector(
      (formState: FS, cacheKey: string) => formState,
      form
    )(
      (formState: FS, cacheKey: string) => cacheKey
    );
}

export type TodoFormModel = FormInputModel<keyof FormTodoModel>[];

export function createTodoForm(): OutputSelector<FormTodoModel, TodoFormModel, GetFormFor<FormTodoModel>>
export function createTodoForm(cache: true): (param: FormTodoModel, cKey: string) => TodoFormModel
export function createTodoForm(cache?: true): (param: FormTodoModel, cKey: string) => TodoFormModel | OutputSelector<FormTodoModel, TodoFormModel, GetFormFor<FormTodoModel>> {
  const form = (todo: FormTodoModel): TodoFormModel => [
    { type: 'text', label: 'Description', value: todo.description, name: 'description' },
    { type: 'checkbox', label: 'Is done', value: todo.done, name: 'done' }
  ];
  return cache ? createForm(form, true) : createForm(form, false);
}
