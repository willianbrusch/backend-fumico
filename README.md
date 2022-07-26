# Test Todo Nestjs

Use this URL as base to requests:

> `https://test-todo-app-fc.herokuapp.com`

## Endpoints:

## USERS

### POST /users

> Criar um usuário.

- don't need authentication

  > #### request body:
  >
  > ```
  > {
  > 	"name": "Nome Teste",
  > 	"email": "teste@email.com",
  > 	"password": "12345aA@",
  > }
  > ```

- **If everything goes right:** http status code: 201
  > #### response body:
  >
  > ```
  > {
  >     "id": "dda75cfb-760b-47d3-9f3e-e20d8525345b",
  > 	"name": "Nome Teste",
  > 	"email": "teste@email.com",
  > 	"password": "12345aA@",
  > 	"created_at": "2022-07-26T14:32:19.798Z",
  > 	"updated_at": "2022-07-26T14:32:19.798Z",
  > }
  > ```

### POST /auth/login

> Fazer Login.

- don't need authentication

  > #### request body:
  >
  > ```
  > {
  > 	"email": "teste@email.com",
  > 	"password": "12345aA@",
  > }
  > ```

- **If everything goes right:** http status code: 201
  > #### response body:
  >
  > ```
  > {
  >   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJzdWIiOiJkZGE3NWNmYi03NjliLTQ3ZDMtOWYzZS1lMjBkZDUyNTM0NWIiLCJlbWFpbCI6InJvYmVydG9AZ21haWwuY29t7iwiaWF0IjoxNjU4ODQ1OTczLCJleHAiOjE2NTg5MzIzNzN9.A4Ldpa7mo7HudB4Mt3bsmZQWA4wtapCTU9ADtGI3ClU"
  > }
  > ```

### PATCH /users/:user_id

> Atualizar um usuário.

- Header -> Authorization: Bearer token

  > #### request body:
  >
  > ```
  > {
  > 	"email": "test1@email.com"
  > }
  > ```

- **If everything goes right:** http status code: 200
  > #### don't return response body

### DELETE /users/:user_id

> Deletar um usuário.

- Header -> Authorization: Bearer token

  > #### dont't need request body

- **If everything goes right:** http status code: 200
  > #### don't return response body

### GET /users/:user_id

> Retornar um usuário.

- Header -> Authorization: Token-admin

  > #### dont't need request body

- **If everything goes right:** http status code: 200

  > #### response body:
  >
  > ```
  > {
  >   "id": "f020hfe3-1afc-4773-b15b-4d37376e1966",
  >   "name": "Nome Teste",
  >   "email": "test1@email.com",
  >   "created_at": "2022-07-26T20:28:23.937Z",
  >   "updated_at": "2022-07-26T20:29:08.696Z",
  >   "todos": [
  >   	{
  >   		"id": "01ffa82e-22e7-4541-b96c-ded9a194b3dg",
  >   		"title": "Estudar",
  >   		"description": "Estudar nestjs por 2 horas.",
  >   		"status": false,
  >   		"created_at": "2022-07-26T20:46:24.307Z",
  >   		"updated_at": "2022-07-26T20:46:24.307Z"
  >   	},
  >   ]
  > }
  > ```

### GET /users

> Retornar todos os usuários.

- Header -> Authorization: Token-admin

  > #### dont't need request body

- **If everything goes right:** http status code: 200
  > #### response body:
  >
  > ```
  > [
  >  {
  >    "id": "f020hfe3-1afc-4773-b15b-4d37376e1966",
  >    "name": "Nome Teste",
  >    "email": "test1@email.com",
  >    "created_at": "2022-07-26T20:28:23.937Z",
  >    "updated_at": "2022-07-26T20:29:08.696Z",
  >    "todos": [
  >    	{
  >    		"id": "01ffa82e-22e7-4541-b96c-ded9a194b3dg",
  >    		"title": "Estudar",
  >    		"description": "Estudar nestjs por 2 horas.",
  >    		"status": false,
  >    		"created_at": "2022-07-26T20:46:24.307Z",
  >    		"updated_at": "2022-07-26T20:46:24.307Z"
  >    	},
  >    ]
  >  },
  >  {
  >    "id": "08900had-26ya-4f1d-b721-4aa29dj60b6a",
  >    "name": "Nome Teste2",
  >    "email": "test2@email.com",
  >    "created_at": "2022-07-26T20:28:23.937Z",
  >    "updated_at": "2022-07-26T20:29:08.696Z",
  >    "todos": []
  >  }
  > ]
  > ```

## TODOS

### POST /todos

> Criar um todo.

- Header -> Authorization: Token-admin

  > #### request body:
  >
  > ```
  > {
  > 	"title": "Estudar",
  > 	"description": "Estudar nestjs por 2 horas.",
  > 	"user": "f060dfe3-1afc-4373-b15b-4d37126e1966",
  > }
  > ```

- **If everything goes right:** http status code: 201
  > #### response body:
  >
  > ```
  > {
  >     "id": "cd527b81-5fa6-49d0-a598-6cabc26c9c25",
  > 	"title": "Estudar",
  > 	"description": "Estudar nestjs por 2 horas.",
  >     "status": false,
  > 	"created_at": "2022-07-26T14:32:19.798Z",
  > 	"updated_at": "2022-07-26T14:32:19.798Z",
  > 	"user": "f060dfe3-1afc-4373-b15b-4d37126e1966",
  > }
  > ```

### PATCH /todos/:todo_id

> Atualizar um todo.

- Header -> Authorization: Bearer token

  > #### request body:
  >
  > ```
  > {
  > 	"status": true
  > }
  > ```

- **If everything goes right:** http status code: 200
  > #### don't return response body

### DELETE /todos/:todo_id

> Deletar um todo.

- Header -> Authorization: Bearer token

  > #### dont't need request body

- **If everything goes right:** http status code: 200
  > #### don't return response body

### GET /todos/:todo_id

> Retornar um todo.

- Header -> Authorization: Token-admin

  > #### dont't need request body

- **If everything goes right:** http status code: 200

  > #### response body:
  >
  > ```
  > {
  >     "id": "cd527b81-5fa6-49d0-a598-6cabc26c9c25",
  > 	"title": "Estudar",
  > 	"description": "Estudar nestjs por 2 horas.",
  >     "status": false,
  > 	"created_at": "2022-07-26T14:32:19.798Z",
  > 	"updated_at": "2022-07-26T14:32:19.798Z",
  > 	"user": "f060dfe3-1afc-4373-b15b-4d37126e1966",
  > }
  > ```

### GET /todos

> Retornar todos os todos.

- Header -> Authorization: Token-admin

  > #### dont't need request body

- **If everything goes right:** http status code: 200
  > #### response body:
  >
  > ```
  > [
  >  {
  >  	 "id": "9edc6c2e-6282-43cc-8715-7519033fdf9a",
  >  	 "title": "Estudar",
  >  	 "description": "Estudar nestjs",
  >  	 "status": true
  >  } ,
  >  {
  >  	 "id": "e11625ef-ee04-48ce-b749-8503ba20021b",
  >  	 "title": "Exercício físico",
  >  	 "description": "1 hora de musculação",
  >  	 "status": false
  >  }
  > ]
  > ```
