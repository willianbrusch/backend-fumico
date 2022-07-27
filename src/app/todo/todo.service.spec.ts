import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TodoService } from './todo.service';
import { User } from '../users/entities/user.entity';
import { Todo } from './entities/todo.entity';

const mockUser = new User();

const newTodo = new Todo({
  id: '1',
  title: 'Todo test',
  description: 'test description',
  status: false,
  user: mockUser,
});

const listTodos = [
  new Todo({
    id: '1',
    title: 'Todo test',
    description: 'test description',
    status: false,
    user: mockUser,
  }),
  new Todo({
    id: '2',
    title: 'Todo test 2',
    description: 'test description',
    status: false,
    user: mockUser,
  }),
];

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: Repository<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: {
            create: jest.fn().mockReturnValue(newTodo),
            save: jest.fn().mockReturnValue(newTodo),
            findAll: jest.fn(),
            find: jest.fn().mockResolvedValue(listTodos),
            findOneById: jest.fn(),
            findOneBy: jest.fn().mockReturnValue(newTodo),
            update: jest.fn(),
            merge: jest.fn(),
            remove: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
    expect(todoRepository).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create an todo', async () => {
      const todo = {
        title: 'test 1',
        description: 'test1@email.com',
        status: false,
        user: mockUser,
      };

      const result = await todoService.create(todo);

      expect(todoRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(newTodo);
    });

    it('should not be able to create a todo', async () => {
      jest.spyOn(todoRepository, 'save').mockRejectedValueOnce(new Error());

      expect(todoService.create).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should be able to show all todos', async () => {
      const result = await todoService.findAll();

      expect(result).toEqual(listTodos);
      expect(todoRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should not be able to show all todos and return an error', async () => {
      jest.spyOn(todoRepository, 'find').mockRejectedValueOnce(new Error());

      expect(todoService.findAll).rejects.toThrowError();
    });

    describe('findOneById', () => {
      it('should be able to show one todo', async () => {
        const result = await todoService.findOneById('1');

        expect(result).toEqual(newTodo);
      });

      it('should not be able to show one todo and return a error', async () => {
        jest
          .spyOn(todoRepository, 'findOneById')
          .mockRejectedValueOnce(new Error());

        expect(todoService.findOneById).rejects.toThrowError();
      });
    });

    describe('update', () => {
      it('should be able to update one todo', async () => {
        const updateDataTodo = {
          title: 'Update title',
          description: 'update description',
        };

        await todoService.update('1', updateDataTodo);

        expect(todoRepository.save).toHaveBeenCalledTimes(1);
        expect(todoRepository.merge).toHaveBeenCalledTimes(1);
      });

      it('should not be able to update one todo and return a error', async () => {
        jest.spyOn(todoRepository, 'update').mockRejectedValueOnce(new Error());

        expect(todoService.update).rejects.toThrowError();
      });
    });

    describe('remove', () => {
      it('should be able to remove one todo', async () => {
        const result = await todoService.remove('1');

        expect(result).toBeUndefined();
      });

      it('should not be able to remove one todo and return a error', async () => {
        jest.spyOn(todoRepository, 'remove').mockRejectedValueOnce(new Error());

        expect(todoService.remove).rejects.toThrowError();
      });
    });
  });
});
