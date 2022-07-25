import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const newUser = new User({
  id: '1',
  name: 'nome test',
  email: 'test@email.com',
  password: '12345aA@',
});

const updatedUser = new User({
  id: '1',
  name: 'Update name',
  email: 'update@email.com',
  password: '12345aA@',
});

const listUsers = [
  new User({
    id: '1',
    name: 'nome test',
    email: 'test@email.com',
    password: '12345aA@',
  }),
  new User({
    id: '2',
    name: 'nome test 2',
    email: 'test2@email.com',
    password: '12345aA@',
  }),
];

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  const mockUserService = {
    create: jest.fn().mockResolvedValue(newUser),
    findAll: jest.fn().mockResolvedValue(listUsers),
    findOneById: jest.fn().mockResolvedValue(newUser),
    update: jest.fn().mockResolvedValue(updatedUser),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create a user', async () => {
      const user = {
        id: '1',
        name: 'nome test',
        email: 'test@email.com',
        password: '12345aA@',
      };

      const result = await userController.create(user);

      expect(result).toEqual(newUser);
      expect(userService.create).toHaveBeenCalledTimes(1);
    });

    it('should not be able to create an user', async () => {
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());

      expect(userController.create).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should be able to show all users', async () => {
      const result = await userController.findAll();

      expect(result).toEqual(listUsers);
      expect(result).toHaveLength(2);
    });

    it('should not be able to show all users and return a error', async () => {
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());

      expect(userController.findAll).rejects.toThrowError();
    });
  });

  describe('findOneById', () => {
    it('should be able to show one user', async () => {
      const result = await userController.findOneById('1');

      expect(result).toEqual(newUser);
    });

    it('should not be able to show one user and return a error', async () => {
      jest.spyOn(userService, 'findOneById').mockRejectedValueOnce(new Error());

      expect(userController.findOneById).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should be able to update one user', async () => {
      const updateDataUser = {
        name: 'Update name',
        email: 'update@email.com',
      };

      const result = await userController.update('1', updateDataUser);

      expect(result).toEqual(updatedUser);
    });

    it('should not be able to update one user and return a error', async () => {
      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());

      expect(userController.update).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should be able to remove one user', async () => {
      const result = await userController.remove('1');

      expect(result).toBeUndefined();
    });

    it('should not be able to remove one user and return a error', async () => {
      jest.spyOn(userService, 'remove').mockRejectedValueOnce(new Error());

      expect(userController.remove).rejects.toThrowError();
    });
  });
});
