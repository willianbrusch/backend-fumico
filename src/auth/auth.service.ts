import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, password: string) {
    let user: User;

    try {
      user = await this.usersService.findOne(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
