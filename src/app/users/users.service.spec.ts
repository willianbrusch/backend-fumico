import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const mockUser = new User({
  id: '1',
  name: 'test 1',
  email: 'test1@email.com',
  password: '12345aA@',
});

const updatedUser = new User({
  id: '1',
  name: 'Update name',
  email: 'update@email.com',
  password: '12345aA@',
});

const mockUsers = [
  new User({
    id: '1',
    name: 'test 1',
    email: 'test1@email.com',
    password: '12345aA@',
  }),
  new User({
    id: '2',
    name: 'test 2',
    email: 'test2@email.com',
    password: '12345aA@',
  }),
  new User({
    id: '3',
    name: 'test 3',
    email: 'test3@email.com',
    password: '12345aA@',
  }),
];

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn().mockReturnValue(mockUser),
            findAll: jest.fn().mockResolvedValue(mockUsers),
            findOneByEmail: jest.fn().mockResolvedValue(mockUser),
            findOneById: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn(),
            merge: jest.fn().mockReturnValue(updatedUser),
            find: jest.fn().mockResolvedValueOnce(mockUsers),
            save: jest.fn().mockResolvedValue(updatedUser),
            findOneBy: jest.fn(),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create an user', async () => {
      const user = {
        name: 'test 1',
        email: 'test1@email.com',
        password: '12345aA@',
      };

      const result = await userService.create(user);

      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUser);
    });

    it('should not be able to create a user', async () => {
      jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error());
      expect(userService.create).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should be able to show all users', async () => {
      const result = await userService.findAll();

      expect(result).toEqual(mockUsers);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should not be able to show all users and return an error', async () => {
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());

      expect(userService.findAll).rejects.toThrowError();
    });
  });

  describe('findOneById', () => {
    it('should be able to show one user', async () => {
      const result = await userService.findOneById('1');

      expect(result).toEqual(mockUsers[0]);
    });

    it('should not be able to show one user and return a error', async () => {
      jest
        .spyOn(userRepository, 'findOneById')
        .mockRejectedValueOnce(new Error());

      expect(userService.findOneById).rejects.toThrowError();
    });
  });

  describe('findOneByEmail', () => {
    it('should be able to show one user', async () => {
      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(mockUser);

      const result = await userService.findOneByEmail('test1@email.com');

      expect(result).toEqual(mockUser);
    });

    it('should not be able to show one user and return a error', async () => {
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockRejectedValueOnce(new Error());
      expect(userService.findOneByEmail).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should be able to update one user', async () => {
      jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValueOnce(updatedUser);

      const updateDataUser = {
        name: 'Update name',
        email: 'update@email.com',
      };

      await userService.update('1', updateDataUser);

      expect(userRepository.save).toHaveBeenCalledTimes(1);
      expect(userRepository.merge).toHaveBeenCalledTimes(1);
    });

    it('should not be able to update one user and return a error', async () => {
      jest.spyOn(userRepository, 'update').mockRejectedValueOnce(new Error());

      expect(userService.update).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should be able to remove one user', async () => {
      const result = await userService.remove('1');

      expect(result).toBeUndefined();
    });

    it('should not be able to remove one user and return a error', async () => {
      jest.spyOn(userRepository, 'remove').mockRejectedValueOnce(new Error());

      expect(userService.remove).rejects.toThrowError();
    });
  });
});
