import { Injectable } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'name', 'email'],
    });
  }

  async findOne(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });

    this.usersRepository.merge(user, updateUserDto);
    // user.name = updateUserDto.name;
    // user.email = updateUserDto.email;
    // user.password = updateUserDto.password;
    // user.updated_at = new Date();

    await this.usersRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    await this.usersRepository.remove(user);
  }
}
