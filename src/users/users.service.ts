import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const alreadyExists = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });

    if (alreadyExists) {
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);
    }

    const user = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(user);

    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'name', 'email'],
      relations: {
        todos: true,
      },
    });
  }

  async findOneById(id: string): Promise<User> {
    const users = await this.usersRepository.find({
      select: ['id', 'name', 'email', 'created_at', 'updated_at'],
      relations: {
        todos: true,
      },
    });

    const user = users.find((user) => id === user.id);
    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });

    user.updated_at = new Date();

    this.usersRepository.merge(user, updateUserDto);

    await this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    await this.usersRepository.remove(user);
  }
}
