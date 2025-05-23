import { TodoRepository } from '../todo.repository';
import { Todo } from '../../domain/todo.entity';

export class ListTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return await this.todoRepository.findAll();
  }
}
