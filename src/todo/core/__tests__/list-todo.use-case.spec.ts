import { ListTodoUseCase } from '../application/use-cases/list-todo.use-case';
import { TodoRepository } from '../application/todo.repository';
import { Todo } from '../domain/todo.entity';

describe('ListTodoUseCase', () => {
  let listTodoUseCase: ListTodoUseCase;
  let todoRepository: jest.Mocked<TodoRepository>;

  beforeEach(() => {
    todoRepository = {
      findAll: jest.fn(),
    } as unknown as jest.Mocked<TodoRepository>;

    listTodoUseCase = new ListTodoUseCase(todoRepository);
  });

  it('should return a list of todos', async () => {
    const todos: Todo[] = [
      {
        id: '1',
        title: 'Todo 1',
        isDone: false,
        markAsDone: jest.fn(),
        updateTitle: jest.fn(),
      },
      {
        id: '2',
        title: 'Todo 2',
        isDone: true,
        markAsDone: jest.fn(),
        updateTitle: jest.fn(),
      },
    ];

    todoRepository.findAll.mockResolvedValue(todos);

    const result = await listTodoUseCase.execute();

    expect(todoRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual(todos);
  });

  it('should return an empty list if no todos are found', async () => {
    todoRepository.findAll.mockResolvedValue([]);

    const result = await listTodoUseCase.execute();

    expect(todoRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
