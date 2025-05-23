import { CreateTodoUseCase } from '../application/use-cases/create-todo.use-case';
import { TodoRepository } from '../application/todo.repository';
import { Todo } from '../domain/todo.entity';

describe('CreateTodoUseCase', () => {
  let createTodoUseCase: CreateTodoUseCase;
  let todoRepository: jest.Mocked<TodoRepository>;

  beforeEach(() => {
    todoRepository = {
      save: jest.fn(),
    } as unknown as jest.Mocked<TodoRepository>;

    createTodoUseCase = new CreateTodoUseCase(todoRepository);
  });

  it('should create a new todo', async () => {
    const newTodo = { title: 'Test Todo' };
    const savedTodo = new Todo('1', newTodo.title, false);

    todoRepository.save.mockResolvedValue(savedTodo);

    const result = await createTodoUseCase.execute(newTodo.title);

    expect(todoRepository.save).toHaveBeenCalledWith(expect.objectContaining(newTodo));
    expect(result).toEqual(savedTodo);
  });

  it('should throw an error if saving the todo fails', async () => {
    const newTodo = { title: 'Test Todo' };

    todoRepository.save.mockRejectedValue(new Error('Save failed'));

    await expect(createTodoUseCase.execute(newTodo.title)).rejects.toThrow('Save failed');
    expect(todoRepository.save).toHaveBeenCalledWith(expect.objectContaining(newTodo));
  });
});
