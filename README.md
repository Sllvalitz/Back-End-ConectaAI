# Sistema Educacional Gameficado

Sistema responsável por permitir o desenvolvimento de conhecimento dos seus usuários de forma gameficada, sendo capaz de receber requisições de cadastro, listagem, atualização e deleção, além de realizar o controle do xp, nível e insígnias do jogador, tornando o aprendizado gamificado com a presença de puzzles em meio a leitura de artigos de interesse do usuário.


## Funcionalidades

- Autenticação de usuários
- Sistema de badges
- Gerenciamento de quizzes
- Sistema de perguntas e respostas
- Controle de artigos

## Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL/SQLite3
- JWT (JSON Web Tokens)
- bcryptjs para hash de senhas
- CORS para controle de requisições

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Sllvalitz/Back-End-ConectaAI.git
cd Back-End-ConectaAI
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```
PORT=3000
DB_URL=sqlite://./database.sqlite3
JWT_SECRET=sua_chave_secreta_aqui

```

## Estrutura do Projeto

```
├── controllers/        # Controladores das rotas
├── repositories/       # Classes de acesso a dados
├── services/          # Lógica de negócios
├── middleware/        # Middleware de autenticação
└── database.js        # Configuração do banco de dados
```

## APIs Disponíveis

### Autenticação
- POST /auth/login
- POST /auth/register

### Usuários
- GET /users
- GET /users/:id
- POST /users
- PUT /users/:id
- DELETE /users/:id

### Quizzes
- GET /quizzes
- GET /quizzes/:id
- POST /quizzes
- PUT /quizzes/:id
- DELETE /quizzes/:id

### Perguntas
- GET /questions
- GET /questions/:id
- POST /questions
- PUT /questions/:id
- DELETE /questions/:id

### Opções
- GET /options
- GET /options/:id
- POST /options
- PUT /options/:id
- DELETE /options/:id

### Respostas do Usuário
- GET /user-answers
- GET /user-answers/:id
- POST /user-answers
- PUT /user-answers/:id
- DELETE /user-answers/:id

### Badges
- GET /badges
- GET /badges/:id
- POST /badges
- PUT /badges/:id
- DELETE /badges/:id

### Artigos
- GET /articles
- GET /articles/:id
- POST /articles
- PUT /articles/:id
- DELETE /articles/:id

## Executando o Projeto

Para iniciar o servidor:
```bash
node index.js
```

## Licença

Este projeto está sob a licença ISC. Veja o arquivo LICENSE para mais detalhes.

## Contribuição

Contribuições são bem-vindas! Por favor, faça um fork do projeto e crie um pull request com suas melhorias.
