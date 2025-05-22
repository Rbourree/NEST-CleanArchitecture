import { IsString, IsUUID } from 'class-validator';

export class TodoIdDto {
  @IsString()
  @IsUUID('4', { message: 'Invalid UUID format' })
  id: string;
}
