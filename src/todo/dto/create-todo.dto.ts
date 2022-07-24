import { IsNotEmpty, Allow } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

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
