# 🎬 Sistema de Filmes

Um sistema simples de gerenciamento de filmes. Usa **MongoDB Atlas** para armazenamento dos filmes e **Amazon S3** para upload das imagens de capa dos filmes.

O projeto permite:
- Fazer login (autenticação com token JWT)
- Cadastrar filmes
- Listar filmes cadastrados
- Remover filmes cadastrados
- Pesquisar filmes cadastrados
- Atualizar nota dos filmes cadastrados
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

Para o sistema usar os middlewares de autenticação de usuário e dia da semana, garanta que no arquivo `/src/routes/movies.js`, as seguintes linhas não estejam comentadas:
```bash
router.use(weekdayMiddleware);
router.use(authMiddleware);
```

### 4️⃣ Rodar o servidor
```bash
npm start
```

O servidor iniciará em:
```
http://localhost:3000
```
## 📑 Variáveis de Ambiente
Crie um arquivo `.env` na raiz do seu projeto com as seguintes variáveis:
```
# Porta do servidor para testes
PORT=3000

# Chave secreta usada pelo JWT
JWT_SECRET=sua-chave-jwt-segura

# Tempo de expiração do token
JWT_EXPIRES_IN=4h

# MongoDB Atlas
ATLAS_URL=mongodb+srv://<username>:<password>@cluster0.umgdmxb.mongodb.net/?appName=Cluster0

# AWS S3
AWS_ACCESS_KEY_ID=sua-key-id-aws
AWS_SECRET_ACCESS_KEY=sua-secret-key-aws
AWS_REGION=regiao-do-seu-bucket
AWS_BUCKET_NAME=nome-do-seu-bucket
```
> Substitua as varíaveis pelas suas varíaveis de ambiente.

Para consegui acesso a um cluster do MongoDB, crie uma conta no [MongoDB Atlas](https://www.mongodb.com/products/platform) e crie um cluster. Copie a URL do seu cluster e cole no .env

Para a configuração do bucket S3 da AWS acesse [Amazon S3](https://aws.amazon.com/pt/s3/), crie uma conta, complete as atapas de configuração e crie seu bucket. Copie e cole as informações do seu bucket para o .env

## 📚 Documentação

### Login
- Faz login e retorna um token JWT
- Rota não protegida
- Método: `POST`

Endpoint:
```bash
http://localhost:3000/login
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
			"imgUrl": "imgUrl.com",
			"__v": 0
		},
		{
			"_id": "id",
			"titulo": "filme2",
			"nota": 6,
			"code": "mv2",
			"imgUrl": "imgUrl2.com",
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
Multipart Form:
```bash
{
	"titulo": "titulo",
	"nota": 1,
	"code": "code"
    "imagem": file.jpg/png
}
```
> É necessário ter a imagem que deseja enviar para o S3 baixada na maquina antes de enviar.

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
http://localhost:3000/filmes/excluir/:code
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
http://localhost:3000/filmes/search/:code
```
Retorno:
```bash
{
	"filme": {
		"_id": "id",
		"titulo": "filme",
		"nota": 10,
		"code": "code",
		"imgUrl": "imgUrl.com",
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
http://localhost:3000/filmes/atualizar/:code
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
		"imgUrl": "imgUrl.com",
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
> ⚠️ É necessário comentar essas linhas pois se não os middlewares serão processados e os testes não conseguirão fazer as requisições com o Axios.

Rode o servidor local para testes:
```bash
npm start
```
Em outro terminal, acesse a pasta do projeto e rode o comando:
```bash
npm test
```
Os testes irão ser executados automaticamente e será mostrado suas informações.

## 📅 Restrições de Acesso

O sistema só pode ser acessado **de segunda a sexta-feira**.  
Nos fins de semana, o middleware `weekday.js` bloqueia as requisições automaticamente.
