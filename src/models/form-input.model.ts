export interface FormInputModel<T = string, V = any> {
  label: string;
  name: T;
  value: V;
  type: 'text' | 'checkbox';
}
