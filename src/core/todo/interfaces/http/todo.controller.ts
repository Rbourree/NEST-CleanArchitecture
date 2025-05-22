import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

// Value-Objects
import { TodoId } from '../../domain/todo-id.value-object';
import { TodoTitle } from '../../domain/todo-title.value-object';

//  Use-cases
import { CreateTodoUseCase } from '../../application/use-cases/create-todo.use-case';
import { ListTodoUseCase } from '../../application/use-cases/list-todo.use-case';
import { CompleteTodoUseCase } from '../../application/use-cases/complete-todo.use-case';

// DTOs
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoIdDto } from './dto/todo-id.dto';

@Controller('todos')
export class TodoController {
  constructor(
    private readonly createTodoUseCase: CreateTodoUseCase,
    private readonly listTodoUseCase: ListTodoUseCase,
    private readonly completeTodoUseCase: CompleteTodoUseCase,
  ) {}

  @Get()
  async findAll() {
    return await this.listTodoUseCase.execute();
  }

  @Post()
  async create(@Body() payload: CreateTodoDto) {
    const title = new TodoTitle(payload.title);
    return await this.createTodoUseCase.execute(title.getValue());
  }

  @Patch(':id/complete')
  async complete(@Param() params: TodoIdDto) {
    const todoId = new TodoId(params.id);
    await this.completeTodoUseCase.execute(todoId);
    return { message: 'Todo marked as complete' };
  }

  @Delete(':id')
  delete(@Param() params: TodoIdDto) {
    const todoId = new TodoId(params.id);
    return { message: `Todo with id ${todoId.getValue()} deleted` };
  }
}
