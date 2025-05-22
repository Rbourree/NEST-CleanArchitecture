import { TodoRepository } from '../port/todo.repository';
import { TodoId } from '../../domain/todo-id.value-object';
import { Inject } from '@nestjs/common';

export class CompleteTodoUseCase {
  constructor(
    @Inject('TodoRepository') private readonly todoRepository: TodoRepository,
  ) {}

  async execute(todoId: TodoId): Promise<void> {
    const todo = await this.todoRepository.findById(todoId);
    if (!todo) {
      throw new Error('Todo not found');
    }

    todo.markAsDone();
    await this.todoRepository.save(todo);
  }
}
