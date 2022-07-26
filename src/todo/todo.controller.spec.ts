import { Test, TestingModule } from '@nestjs/testing';

import { TodoController } from './todo.controller';
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

const updatedTodo = new Todo({
  id: '1',
  title: 'Update title',
  description: 'Update description',
  status: true,
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

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  const mockTodoService = {
    create: jest.fn().mockResolvedValue(newTodo),
    findAll: jest.fn().mockResolvedValue(listTodos),
    findOneById: jest.fn().mockResolvedValue(newTodo),
    update: jest.fn().mockResolvedValue(updatedTodo),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    })
      .overrideProvider(TodoService)
      .useValue(mockTodoService)
      .compile();

    todoController = module.get<TodoController>(TodoController);
    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create a todo', async () => {
      const todo = {
        id: '1',
        title: 'Todo test',
        description: 'test description',
        status: false,
        user: mockUser,
      };

      const result = await todoController.create(todo);

      expect(result).toEqual(newTodo);
      expect(todoService.create).toHaveBeenCalledTimes(1);
    });

    it('should not be able to create todo', async () => {
      jest.spyOn(todoService, 'create').mockRejectedValueOnce(new Error());

      expect(todoController.create).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should be able to show all todos', async () => {
      const result = await todoController.findAll();

      expect(result).toEqual(listTodos);
      expect(result).toHaveLength(2);
    });

    it('should not be able to show todo and return a error', async () => {
      jest.spyOn(todoService, 'findAll').mockRejectedValueOnce(new Error());

      expect(todoController.findAll).rejects.toThrowError();
    });
  });

  describe('findOneById', () => {
    it('should be able to show one todo', async () => {
      const result = await todoController.findOneById('1');

      expect(result).toEqual(newTodo);
    });

    it('should not be able to show one todo and return a error', async () => {
      jest.spyOn(todoService, 'findOneById').mockRejectedValueOnce(new Error());

      expect(todoController.findOneById).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should be able to update one todo', async () => {
      const updateDataTodo = {
        title: 'Update title',
        description: 'Update description',
        status: true,
      };

      const result = await todoController.update('1', updateDataTodo);

      expect(result).toEqual(updatedTodo);
    });

    it('should not be able to update one todo and return a error', async () => {
      jest.spyOn(todoService, 'update').mockRejectedValueOnce(new Error());

      expect(todoController.update).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should be able to remove one todo', async () => {
      const result = await todoController.remove('1');

      expect(result).toBeUndefined();
    });

    it('should not be able to remove one todo and return a error', async () => {
      jest.spyOn(todoService, 'remove').mockRejectedValueOnce(new Error());

      expect(todoController.remove).rejects.toThrowError();
    });
  });
});
