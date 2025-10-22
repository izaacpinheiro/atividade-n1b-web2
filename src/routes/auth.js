// arquivo responsável pera gerenciar a rota de login

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// importando usuários
const { users } = require('../data/movies');

const router = express.Router();

// senha e tempo no .env
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// rota POST /login
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email e senha obrigatórios'});

    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: 'credenciais inválidas'});

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'credenciais inválidas'});

    const token = jwt.sign({ sub:user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    return res.json({ token });
});

module.exports = router;