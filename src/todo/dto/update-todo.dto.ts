import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateTodoDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(
  OmitType(CreateTodoDto, ['user'] as const),
) {}
