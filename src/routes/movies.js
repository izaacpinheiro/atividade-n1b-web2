// responsável por gerenciar as rotas do CRUD e de geração do PDF

const express = require("express");
const { movies } = require("../data/movies");
const { v4: uuidv4 } = require("uuid");
const authMiddleware = require("../middleware/auth");
const weekdayMiddleware = require("../middleware/weekday");
const { generatePDF } = require("../utils/pdfGenerator");

const router = express.Router();

// aplica a autentição de dia da semana e do JWT
router.use(weekdayMiddleware);
router.use(authMiddleware);

// rota GET /moveis -> lista de filmes
router.get("/", (req, res) => {
    res.json(movies);
});

// rota POST /movies -> adicionar filme a lista
router.post("/", (req, res) => {
    const { title, nota, code } = req.body;
    if (!title || !nota || !code)
        return res
            .status(400)
            .json({ error: "Titúlo, Nota e Código são obrigatórios" });

    // conferindo se já existe um filme com o mesmo código
    const exists = movies.find((m) => m.code === code);
    if (exists)
        return res
            .status(409)
            .json({ error: "Já existe um filme com esse código" });

    // criando o novo filme
    const newMovie = {
        id: uuidv4(),
        title,
        nota,
        code,
    };
    movies.push(newMovie);
    res.status(201), res.json(newMovie);
});

// rota DELETE /filmes/:code
router.delete("/:code", (req, res) => {
    const { code } = req.params;
    const index = movies.findIndex((m) => m.code === code);
    if (index === -1)
        return res.status(401).json({ error: "Filme não encontado" });

    movies.splice(index, 1);
    res.json({ message: 'Filme deletado.' });
});

// rota GET /filmes/search?code -> busca pelo código
router.get("/search", (req, res) => {
    const { code } = req.query;
    if (!code) return res.status(400).json({ error: "O código do filme é obrigatório para a pesquisa" });

    const found = movies.filter((m) => m.code === code);
    res.json(found);
});

// rota GET /movies/pdf -> gera e retorna o PDF com os filmes
router.get("/pdf", async (req, res) => {
    res.setHeader("Content-Disposition", "attachment; filename=movies.pdf");
    res.setHeader("Content-Type", "application/pdf");
    generatePDF(movies, res);
});

module.exports = router;
