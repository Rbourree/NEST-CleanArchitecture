import { Todo } from '../../domain/todo.entity';
import { TodoId } from '../../domain/todo-id.value-object';

export abstract class TodoRepository {
  abstract save(todo: Todo): Promise<Todo>;
  abstract findById(id: TodoId): Promise<Todo | null>;
  abstract findAll(): Promise<Todo[]>;
  abstract deleteById(id: TodoId): Promise<void>;
}
