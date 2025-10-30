# 🎬 Sistema de Filmes — Node.js + Express

Um sistema simples de gerenciamento de filmes desenvolvido em **Node.js**, com **Express**, **JWT** e **bcrypt**.  
O projeto permite:
- Cadastrar e listar filmes (mockados em memória)  
- Adicionar e remover filmes  
- Gerar um PDF com a lista de filmes  
- Fazer login (autenticação com token JWT)  
- Restringir acesso apenas a dias úteis (segunda a sexta)

## 🚀 Tecnologias Utilizadas

- **Node.js** — ambiente de execução JavaScript  
- **Express** — framework web para rotas e middlewares  
- **JWT (jsonwebtoken)** — autenticação de usuários  
- **bcrypt** — hash de senha  
- **pdfkit** — geração de PDFs  

## ⚙️ Como Rodar o Projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/izaacpinheiro/atividade-n1b-web2.git
```

### 2️⃣ Entrar na pasta do projeto
```bash
cd atividade-n1b-web2
```

### 3️⃣ Instalar as dependências
```bash
npm install
```

### 4️⃣ Configurar variáveis de ambiente
Crie um arquivo **.env** na raiz do projeto com o seguinte conteúdo:
```
PORT=3000
JWT_SECRET=minha_chave_super_segura_12345
JWT_EXPIRES_IN=4h
```
> ⚠️ Apenas para exemplo de uso da aplicação.

### 5️⃣ Rodar o servidor
```bash
node src/app.js
```

O servidor iniciará em:
```
http://localhost:3000
```

## 🔑 Rotas Principais

| Método | Rota | Descrição | Protegida |
|:------:|:------|:-----------|:-----------|
| `POST` | `/login` | Faz login e retorna um token JWT | ❌ Não |
| `GET` | `/filmes` | Lista todos os filmes | ✅ Sim |
| `POST` | `/filmes` | Adiciona um novo filme | ✅ Sim |
| `DELETE` | `/filmes/:code` | Remove um filme pelo código | ✅ Sim |
| `GET` | `/filmes/pdf` | Gera PDF da lista de filmes | ✅ Sim |

> ⚠️ As rotas protegidas exigem o token JWT no cabeçalho:  
> `Authorization: Bearer <seu_token_aqui>`

## 📅 Restrições de Acesso

O sistema só pode ser acessado **de segunda a sexta-feira**.  
Nos fins de semana, o middleware `weekday.js` bloqueia as requisições automaticamente.

## 📄 Geração de PDF

A rota `/filmes/pdf` gera um PDF com a lista atual de filmes e faz o download automaticamente.
