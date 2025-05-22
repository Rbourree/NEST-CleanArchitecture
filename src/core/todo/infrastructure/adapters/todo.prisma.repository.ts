import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { TodoRepository } from '../../application/port/todo.repository';
import { Todo } from '../../domain/todo.entity';
import { TodoId } from '../../domain/todo-id.value-object';

@Injectable()
export class TodoPrismaRepository implements TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Todo[]> {
    const todos = await this.prisma.todo.findMany();
    return todos.map((todo) => new Todo(todo.id, todo.title, todo.isDone));
  }

  async findById(id: TodoId): Promise<Todo | null> {
    const todo = await this.prisma.todo.findUnique({
      where: { id: id.getValue() },
    });
    if (!todo) return null;
    return new Todo(todo.id, todo.title, todo.isDone);
  }

  async save(todo: Todo): Promise<Todo> {
    const savedTodo = await this.prisma.todo.upsert({
      where: { id: todo.id },
      update: { title: todo.title, isDone: todo.isDone },
      create: { id: todo.id, title: todo.title, isDone: todo.isDone },
    });
    return new Todo(savedTodo.id, savedTodo.title, savedTodo.isDone);
  }

  async deleteById(id: TodoId): Promise<void> {
    await this.prisma.todo.delete({ where: { id: id.getValue() } });
  }
}
