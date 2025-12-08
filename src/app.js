// ponto de entrada da aplicação (sem iniciar o servidor aqui)

require('dotenv').config();

const connectDB = require('./config/db');

const express = require('express');
const bodyParser = require('body-parser');

const autoRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');

const app = express();

// conecta ao banco
connectDB();

app.use(bodyParser.json());

// Rota pública
app.use('/login', autoRoutes);

// Rotas privadas
app.use('/filmes', movieRoutes);

// Exporta o app para o Vercel
module.exports = app;
