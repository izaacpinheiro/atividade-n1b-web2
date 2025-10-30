// responsável por gerenciar as rotas do CRUD e de geração do PDF

const express = require("express");
const { movies } = require("../data/movies");
const { v4: uuidv4 } = require("uuid");
const authMiddleware = require("../middleware/auth");
const weekdayMiddleware = require("../middleware/weekday");
const { generateMoviesPDF } = require("../utils/pdfGenerator");

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

// rota DELETE /movies/:id
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const idx = movies.findIndex((m) => m.id === id);
    if (idx === -1)
        return res.status(401).json({ error: "Filme não encontado" });

    const removed = movies.splice(idx, 1)[0];
    res.json({ removed });
});

// rota GET /movies/search?id -> busca por id
router.get("/search", (req, res) => {
    const { id } = req.query;
    if (!id)
        return res
            .status(400)
            .json({ error: "ID é obrigatório para a pesquisa" });

    const found = movies.filter((m) => m.id === id);
    res.json(found);
});

// rota GET /movies/pdf -> gera e retorna o PDF com os filmes
router.get("/pdf", async (req, res) => {
    res.setHeader("Content-Disposition", "attachment; filename=movies.pdf");
    res.setHeader("Content-Type", "application/pdf");
    generateMoviesPDF(movies, res);
});

module.exports = router;
