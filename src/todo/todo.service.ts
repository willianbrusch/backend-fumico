import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todosRepository.create(createTodoDto);
    return await this.todosRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return await this.todosRepository.find({
      select: ['id', 'title', 'description', 'status'],
    });
  }

  async findOneById(id: string): Promise<Todo> {
    return await this.todosRepository.findOneBy({ id });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<void> {
    const todo = await this.todosRepository.findOneBy({ id });

    todo.updated_at = new Date();

    this.todosRepository.merge(todo, updateTodoDto);

    await this.todosRepository.save(todo);
  }

  async remove(id: string): Promise<void> {
    const todo = await this.todosRepository.findOneBy({ id });
    await this.todosRepository.remove(todo);
  }
}
