
# 🧠 ConectaAI – API Back-End

API RESTful desenvolvida com Express.js e Prisma, parte do **Desafio 05** do Programa Trilhas Inova 2025.

---

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/Sllvalitz/Back-End-ConectaAI.git
   cd Back-End-ConectaAI
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env`:
   ```env
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/seu_banco"
   ```

---

## ▶️ Execução local

### 1. Rodar as migrações
```bash
npx prisma migrate dev
```

### 2. Subir o servidor
```bash
npm run dev
```

API rodando em:
```
http://localhost:3333
```

---

## 📘 Documentação da API

### ✅ Criar artigo

```
POST /artigos
```

**Body JSON:**
```json
{
  "titulo": "Título do artigo",
  "conteudo": "Texto completo...",
  "imagemUrl": "https://exemplo.com/imagem.jpg"
}
```

---

### 🔍 Buscar por ID

```
GET /artigos/:id
```

**Exemplo:**
```
GET /artigos/1
```

---

### 🔎 Buscar por slug

```
GET /artigos/slug/:slug
```

**Exemplo:**
```
GET /artigos/slug/introducao-a-ia-generativa
```

---

## ⚙️ Tecnologias utilizadas

- Node.js
- Express
- Prisma
- PostgreSQL
- Slugify
- Dotenv

---

## 📁 Estrutura do Projeto

```
src/
├── config/           # Conexão com o banco
├── controllers/      # Regras de negócio
├── routes/           # Endpoints da API
├── middlewares/      # Configuração de autenticação

prisma/
├── schema.prisma     # Modelo do banco
├── migrations/       # Histórico de migrações
```

---

## 🔐 Segurança

- Variáveis sensíveis fora do código (`.env`)
- Prisma com proteção contra SQL Injection
- Estrutura pronta para autenticação

---

## 📄 Licença

Projeto acadêmico do **Programa Trilhas Inova 2025**  
Uso livre para fins educacionais.

---
