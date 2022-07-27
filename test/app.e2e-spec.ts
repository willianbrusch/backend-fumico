import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/app/users/entities/user.entity';

const userNameMock = 'testando1sdaa1';
const userEmailMock = 'testando@email.com1sdaa1';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Users', () => {
    it('(CRUD) Create user, login, update, get user, get all users, delete', async () => {
      //Create user
      const user = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: userNameMock,
          email: userEmailMock,
          password: '12345aA@',
        })
        .expect(201);

      expect(user.body).toEqual({
        id: expect.any(String),
        name: userNameMock,
        email: userEmailMock,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });

      // Login with user
      const token = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: userEmailMock,
          password: '12345aA@',
        })
        .expect(201);

      // Update user
      await request(app.getHttpServer())
        .patch(`/users/${user.body.id}`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .send({
          email: 'updates@email.com',
        })
        .expect(200);

      // Get user
      const getOneUser = await request(app.getHttpServer())
        .get(`/users/${user.body.id}`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .expect(200);

      expect(getOneUser.body).toEqual({
        id: expect.any(String),
        name: userNameMock,
        email: 'updates@email.com',
        created_at: expect.any(String),
        updated_at: expect.any(String),
        todos: [],
      });

      // Get all users
      await request(app.getHttpServer())
        .get(`/users`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .expect(200);

      // Delete user
      await request(app.getHttpServer())
        .delete(`/users/${user.body.id}`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .expect(200);
    });
  });

  describe('Todos', () => {
    it('(CRUD) Create todo, update, get todo, get all todos, delete', async () => {
      //Create user
      const user = await request(app.getHttpServer())
        .post('/users')
        .send({
          name: userNameMock,
          email: userEmailMock,
          password: '12345aA@',
        })
        .expect(201);

      // Login with user
      const token = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: userEmailMock,
          password: '12345aA@',
        })
        .expect(201);

      // Create todo
      const todo = await request(app.getHttpServer())
        .post('/todos')
        .set('Authorization', `Bearer ${token.body.token}`)
        .send({
          title: 'new todo',
          description: 'testando description',
          user: `${user.body.id}`,
        })
        .expect(201);

      // Update todo
      await request(app.getHttpServer())
        .patch(`/todos/${todo.body.id}`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .send({
          status: true,
        })
        .expect(200);

      // Get todo
      const getOneTodo = await request(app.getHttpServer())
        .get(`/todos/${todo.body.id}`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .expect(200);

      expect(getOneTodo.body).toEqual({
        id: expect.any(String),
        title: 'new todo',
        description: 'testando description',
        status: true,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });

      // Get all todos
      await request(app.getHttpServer())
        .get(`/todos`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .expect(200);

      // Delete todo
      await request(app.getHttpServer())
        .delete(`/todos/${todo.body.id}`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .expect(200);

      //Delete user
      await request(app.getHttpServer())
        .delete(`/users/${user.body.id}`)
        .set('Authorization', `Bearer ${token.body.token}`)
        .expect(200);
    });
  });
});
