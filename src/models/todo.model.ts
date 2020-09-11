export interface TodoModel {
  id: string,
  done: boolean;
  description: string;
  date: Date | null;
}

export type FormTodoModel = Pick<TodoModel, 'description' | 'done'>
