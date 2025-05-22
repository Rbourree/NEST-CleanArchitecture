import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TodoModule } from './core/todo/todo.module';

@Module({
  imports: [PrismaModule, TodoModule],
})
export class AppModule {}
