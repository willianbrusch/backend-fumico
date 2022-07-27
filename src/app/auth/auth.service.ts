import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    let user: User;

    try {
      user = await this.usersService.findOneByEmail(email);
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
