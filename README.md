# Forum API 🚀

## Descrição

Esta é uma API construída com **Node.js**, **Express** e **MongoDB** para criação de posts e registro de usuários. Ela oferece suporte a autenticação JWT e upload de imagens para o Cloudinary.

---

## 🚧 Status do Projeto

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/usuario/projeto)

---

## 💻 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/devlab-api.git
cd devlab-api
npm install
```

Crie um arquivo `.env` com as variáveis de ambiente:

```env
PORT=3000
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_do_banco
SECRET_JWT=sua_chave_secreta
CLOUDINARY_NAME=nome
CLOUDINARY_KEY=chave
CLOUDINARY_SECRET=segredo
```

---

## 📂 Estrutura do Projeto

```bash
src/
├── controllers/
├── services/
├── models/
├── middlewares/
├── routes/
├── database/
└── server.js
```

---

## 🚀 Funcionalidades

- ✅ Autenticação com JWT  
- ✅ Registro e login de usuários  
- ✅ Atualização de perfil  
- ✅ Criação, listagem e busca de posts  
- ✅ Upload de imagens (Cloudinary)  
- ✅ Paginação de posts  

---

## 🔒 Middlewares

### `authMiddleware`

- Verifica se o token JWT é válido.
- Extrai o `userId` e adiciona ao `req.userId`.
- Retorna 401 se o token for inválido ou inexistente.

### `validId`

- Valida se o `req.params.id` é um Mongo ID válido.
- Retorna 400 se o ID for inválido.

### `validUser`

- Verifica se o usuário existe no banco.
- Adiciona `req.user` e `req.id`.
- Retorna 400 se o usuário não for encontrado.

---

## 🧪 Rotas da API

### 🔐 Auth

#### Login

```http
POST /auth/login
```

**Body:**

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

**Response:**

```json
{
  "token": "jwt-token"
}
```

---

### 👤 Usuários

#### Criar usuário

```http
POST /user
```

**Body:**

```json
{
  "name": "Nome",
  "username": "apelido",
  "email": "email@exemplo.com",
  "password": "123456",
  "avatar": "url-imagem",
  "background": "url-capa"
}
```

**Response:**

```json
{
  "_id": "id-do-usuario",
  "name": "Nome",
  ...
}
```

#### Listar todos os usuários

```http
GET /user
```

**Response:**

```json
[
  {
    "_id": "id1",
    "name": "Usuário 1"
  },
  ...
]
```

#### Buscar usuário logado

```http
GET /user/:id
```

**Middlewares:** `authMiddleware`, `validId`, `validUser`

**Response:**

```json
{
  "_id": "id",
  "name": "Usuário",
  ...
}
```

#### Atualizar usuário

```http
PATCH /user/:id
```

**Middlewares:** `authMiddleware`, `validId`, `validUser`

**Body (opcional):**

```json
{
  "name": "Novo Nome",
  "avatar": "nova-url"
}
```

**Response:**

```json
{
  "message": "User successfully updated"
}
```

---

### 📝 Posts

#### Criar post

```http
POST /post
```

**Middleware:** `authMiddleware`

**Body:**

```json
{
  "title": "Título do post",
  "text": "Conteúdo do post",
  "banner": "url-da-imagem"
}
```

**Response:**

```json
{
  "_id": "id-do-post",
  "title": "Título",
  ...
}
```

#### Listar posts (com paginação)

```http
GET /post?limit=10&offset=0
```

**Response:**

```json
[
  {
    "_id": "id1",
    "title": "Post 1"
  },
  ...
]
```

---

## 📦 Dependências principais

- Node.js  
- Express  
- MongoDB (mongoose)  
- JWT  
- Bcrypt  
- Multer  
- Cloudinary SDK  

---

## 📜 Licença

Este projeto está sob a licença MIT.

---

## 📞 Contato

Feito por [Seu Nome](https://github.com/seu-usuario)

