import { CompleteTodoUseCase } from '../application/use-cases/complete-todo.use-case';
import { TodoRepository } from '../application/todo.repository';
import { Todo } from '../domain/todo.entity';
import { TodoId } from '../domain/todo-id.value-object';

describe('CompleteTodoUseCase', () => {
  let completeTodoUseCase: CompleteTodoUseCase;
  let todoRepository: jest.Mocked<TodoRepository>;

  beforeEach(() => {
    todoRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    } as unknown as jest.Mocked<TodoRepository>;

    completeTodoUseCase = new CompleteTodoUseCase(todoRepository);
  });

  it('should mark a todo as completed', async () => {
    const todo = new Todo('1', 'Sample Todo', false);

    todoRepository.findById.mockResolvedValue(todo);
    todoRepository.save.mockResolvedValue(todo);

    const todoId: TodoId = new TodoId('1');
    const result = await completeTodoUseCase.execute(todoId);

    expect(todoRepository.findById).toHaveBeenCalledWith(todoId);
    expect(todoRepository.save).toHaveBeenCalledWith(todo);
    expect(result).toBe(true);
  });

  it('should throw an error if the todo is not found', async () => {
    todoRepository.findById.mockResolvedValue(null);
    const todoId: TodoId = new TodoId('1');

    await expect(completeTodoUseCase.execute(todoId)).rejects.toThrow(
      'Todo not found',
    );
    expect(todoRepository.findById).toHaveBeenCalledWith(todoId);
    expect(todoRepository.save).not.toHaveBeenCalled();
  });
});
