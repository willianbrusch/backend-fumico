import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  constructor(todo?: Partial<Todo>) {
    this.id = todo?.id;
    this.title = todo?.title;
    this.description = todo?.description;
    this.status = todo?.status;
    this.created_at = todo?.created_at;
    this.updated_at = todo?.updated_at;
    this.user = todo?.user;
  }
}
