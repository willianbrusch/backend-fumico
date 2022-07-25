import { IsNotEmpty, Allow } from 'class-validator';
import { User } from '../../users/entities/user.entity';

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @Allow()
  status: boolean;

  @IsNotEmpty()
  @Allow()
  user: User;
}
