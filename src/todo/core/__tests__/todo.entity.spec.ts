import { Todo } from '../domain/todo.entity';

describe('Todo Entity', () => {
  it('should create a Todo with default isDone as false', () => {
    const todo = new Todo('1', 'Test Todo');
    expect(todo.id).toBe('1');
    expect(todo.title).toBe('Test Todo');
    expect(todo.isDone).toBe(false);
  });

  it('should mark a Todo as done', () => {
    const todo = new Todo('1', 'Test Todo');
    todo.markAsDone();
    expect(todo.isDone).toBe(true);
  });

  it('should update the title of a Todo', () => {
    const todo = new Todo('1', 'Old Title');
    todo.updateTitle('New Title');
    expect(todo.title).toBe('New Title');
  });

  it('should throw an error when updating the title to an empty string', () => {
    const todo = new Todo('1', 'Old Title');
    expect(() => todo.updateTitle('')).toThrowError('Title cannot be empty');
  });

  it('should throw an error when updating the title to a string with only spaces', () => {
    const todo = new Todo('1', 'Old Title');
    expect(() => todo.updateTitle('   ')).toThrowError('Title cannot be empty');
  });
});
