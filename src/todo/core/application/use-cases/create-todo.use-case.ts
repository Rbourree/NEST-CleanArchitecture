import { TodoRepository } from '../todo.repository';
import { Todo } from '../../domain/todo.entity';
import { TodoTitle } from '../../domain/todo-title.value-object';

export class CreateTodoUseCase {
  constructor(private readonly todoRepository: TodoRepository) {}

  async execute(title: string): Promise<Todo> {
    const todoTitle = new TodoTitle(title);
    const newTodo = new Todo(
      Math.random().toString(36).substring(2, 15), // Génération d'un ID unique temporaire
      todoTitle.getValue(),
    );

    const todo = await this.todoRepository.save(newTodo);
    if (!todo) {
      throw new Error('Todo could not be created');
    }
    return todo;
  }
}
