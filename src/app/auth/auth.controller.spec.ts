import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const token = '1234567890';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn().mockResolvedValue(token),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should be able to login with user', async () => {
      const user = {
        email: 'test@email.com',
        password: '12345aA@',
      };

      const result = await authController.login(user);

      expect(result).toEqual(token);
      expect(authService.login).toHaveBeenCalledTimes(1);
    });

    it('should not be able to login with user', async () => {
      jest.spyOn(authService, 'login').mockRejectedValueOnce(new Error());

      expect(authController.login).rejects.toThrowError();
    });
  });
});
