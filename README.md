# 🎬 Sistema de Filmes

Um sistema simples de gerenciamento de filmes.  
O projeto permite:
- Fazer login (autenticação com token JWT)
- Cadastrar e listar filmes
- Adicionar e remover filmes
- Pesquisar filmes cadastrados
- Atualizar nota dos filmes
- Restringir acesso apenas a dias úteis (segunda a sexta)

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

### 4️⃣ Rodar o servidor
```bash
npm start
```

O servidor iniciará em:
```
http://localhost:3000
```
## 📚 Documentação

### Login
- Faz login e retorna um token JWT
- Rota não protegida
- Método: `POST`

Endpoint:
```bash
http://localhost:3000/filmes/login
```
Body JSON:
```bash
{
    "email": "email",
    "password": "password"
}
```
Retorno:
```bash
{
    "token": "tokenjwt"
}
```
> ⚠️ As rotas protegidas exigem o token JWT no cabeçalho:  
> `Authorization: Bearer <seu_token_aqui>`

### Listar Filmes
- Lista todos os filmes cadastrados
- Rota protegida
- Método: `GET`

Endpoint:
```bash
http://localhost:3000/filmes/listar
```
Retorno:
```bash
{
	"filmes": [
		{
			"_id": "id",
			"titulo": "filme1",
			"nota": 10,
			"code": "mv1",
			"__v": 0
		},
		{
			"_id": "id",
			"titulo": "filme2",
			"nota": 6,
			"code": "mv2",
			"__v": 0
		},
		.
        .
        .
	]
}
```
### Inserir Filme
- Adiciona um novo filme
- Rota protegida
- Método: `POST`

Endpoint:
```bash
http://localhost:3000/filmes/inserir
```
Body JSON:
```bash
{
	"titulo": "titulo",
	"nota": 1,
	"code": "code"
}
```
Retorno:
```bash
{
	"mensagem": "Novo filme cadastrado."
}
```
### Excluir Filme
- Remove um filme pelo código
- Rota protegida
- Método: `DELETE`

Endpoint:
```bash
http://localhost:3000/excluir/code
```
Retorno:
```bash
{
	"mensagem": "Exclusão realizada."
}
```
### Pesquisar Filme
- Pesquisa um filme pelo código
- Rota protegida
- Método: `GET`

Endpoint:
```bash
http://localhost:3000/filmes/search/code
```
Retorno:
```bash
{
	"filme": {
		"_id": "id",
		"titulo": "filme",
		"nota": 10,
		"code": "code",
		"__v": 0
	}
}
```
### Atualizar nota de um Filme
- Atualiza a nota de um filme pelo código
- Rota protegida
- Método: `PUT`

Endpoint:
```bash
http://localhost:3000/filmes/atualizar/code
```
Body JSON:
```bash
{
	"nota": 10
}
```
Retorno:
```bash
{
	"mensagem": "Nota atualizada.",
	"filme": {
		"_id": "id",
		"titulo": "filme",
		"nota": 10,
		"code": "code",
		"__v": 0
	}
}
```

## 🛠 Testes

Antes de rodar os testes unitários, vá ao arquivo `/src/routes/movies.js` e comente as seguintes linhas:
```bash
router.use(weekdayMiddleware); -> // router.use(weekdayMiddleware);
router.use(authMiddleware);    -> // router.use(authMiddleware);
```
> É necessário comentar essas linhas pois se não os middlewares serão processados e os testes não conseguirão fazer as requisições com o Axios.

Rode o servidor:
```bash
npm start
```
Em outro terminal, rode o comando:
```bash
npm test
```
Os testes irão ser executados automaticamente e será mostrado suas informações.

## 📅 Restrições de Acesso

O sistema só pode ser acessado **de segunda a sexta-feira**.  
Nos fins de semana, o middleware `weekday.js` bloqueia as requisições automaticamente.
