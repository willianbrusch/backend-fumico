import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let authJwtService: JwtService;
  let authUserService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, JwtService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authJwtService = module.get<JwtService>(JwtService);
    authUserService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    // expect(authService).toBeDefined();
    // expect(authJwtService).toBeDefined();
    // expect(authUserService).toBeDefined();
  });
});
