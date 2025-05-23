import { TodoRepository } from '../todo.repository';
import { TodoId } from '../../domain/todo-id.value-object';

export class CompleteTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(todoId: TodoId): Promise<boolean> {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) {
      throw new Error('Todo not found');
    }

    todo.markAsDone();
    await this.todoRepository.save(todo);
    return true;
  }
}
