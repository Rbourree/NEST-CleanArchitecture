import { TodoRepository } from '../port/todo.repository';
import { Todo } from '../../domain/todo.entity';
import { Inject } from '@nestjs/common';

export class ListTodoUseCase {
  constructor(
    @Inject('TodoRepository') private readonly todoRepository: TodoRepository,
  ) {}

  async execute(): Promise<Todo[]> {
    return await this.todoRepository.findAll();
  }
}
