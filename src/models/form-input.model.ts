export interface FormInputModel<T = string> {
  label: string;
  name: T;
  value: any;
  type: string;
}
