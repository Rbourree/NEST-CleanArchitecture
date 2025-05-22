import { Module } from '@nestjs/common';
import { TodoController } from './interfaces/http/todo.controller';
import { TodoPrismaRepository } from './infrastructure/adapters/todo.prisma.repository';
import { CreateTodoUseCase } from './application/use-cases/create-todo.use-case';
import { ListTodoUseCase } from './application/use-cases/list-todo.use-case';
import { CompleteTodoUseCase } from './application/use-cases/complete-todo.use-case';

@Module({
  imports: [],
  controllers: [TodoController],
  providers: [
    CreateTodoUseCase,
    ListTodoUseCase,
    CompleteTodoUseCase,
    {
      provide: 'TodoRepository',
      useClass: TodoPrismaRepository,
    },
  ],
  exports: [],
})
export class TodoModule {}
