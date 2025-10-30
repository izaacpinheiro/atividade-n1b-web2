// ponto de entrada da aplicação

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')

const autoRoutes = require('./routes/auth')
const movieRoutes = require('./routes/movies')

const app = express()
app.use(bodyParser.json())

// Rota pública
app.use('/login', autoRoutes)

// Rotas privadas
app.use('/filmes', movieRoutes)

// inicia o servidor
const PORTA = process.env.PORT;
app.listen(PORTA, () => {
    console.log('API rodando na porta 3000')
})