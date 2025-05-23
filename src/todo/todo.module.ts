import { Module } from '@nestjs/common';
import { TodoController } from './presentation/http/todo.controller';
import { TodoPrismaRepository } from './infrastructure/prisma/todo.prisma.repository';
import { CreateTodoUseCase } from './core/application/use-cases/create-todo.use-case';
import { ListTodoUseCase } from './core/application/use-cases/list-todo.use-case';
import { CompleteTodoUseCase } from './core/application/use-cases/complete-todo.use-case';
import { TodoRepository } from './core/application/todo.repository';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [
    CreateTodoUseCase,
    ListTodoUseCase,
    CompleteTodoUseCase,
    {
      provide: CreateTodoUseCase,
      useFactory: (repo: TodoRepository) => new CreateTodoUseCase(repo),
      inject: [TodoRepository],
    },
    {
      provide: ListTodoUseCase,
      useFactory: (repo: TodoRepository) => new ListTodoUseCase(repo),
      inject: [TodoRepository],
    },
    {
      provide: CompleteTodoUseCase,
      useFactory: (repo: TodoRepository) => new CompleteTodoUseCase(repo),
      inject: [TodoRepository],
    },
    {
      provide: TodoRepository,
      useClass: TodoPrismaRepository,
    },
  ],
  exports: [],
})
export class TodoModule {}
