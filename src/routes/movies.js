// responsável por gerenciar as rotas do CRUD e de geração do PDF

const express = require("express");
const Filme = require("../models/Filme")
const authMiddleware = require("../middleware/auth");
const weekdayMiddleware = require("../middleware/weekday");

// router de filmes
const router = express.Router();

// aplica a autentição de dia da semana e do JWT
if (process.env.NODE_ENV !== "test") {
    router.use(weekdayMiddleware);
    router.use(authMiddleware);
}

// rota GET /filmes/listar -> lista de filmes
router.get("/listar", async (req, res) => {
    try {
        const filmesBuscados = await Filme.find();
        res.json({filmes: filmesBuscados})
    } catch (error) {
        res.json({error: true, mensagem: 'Erro durante busca dos filmes.', tipo: error})
    }
});

// rota POST /filmes/inserir -> adicionar filme a lista
router.post("/inserir", async (req, res) => {
    try {
        const {titulo, nota, code} = req.body;
        await Filme.create({titulo: titulo, nota: nota, code: code})
        res.json({mensagem: 'Novo filme cadastrado.'})
    } catch (error) {
        res.json({error: true, mensagem: 'Erro durante cadastro do filme.', tipo: error});
    }
});

// rota DELETE /filmes/excluir/code -> excluir filme pelo código
router.delete("/excluir/:code", async (req, res) => {
    try {
        const { code } = req.params;
        await Filme.deleteOne({code: code});
        res.json({mensagem: 'Exclusão realizada.'})
    } catch (error) {
        res.json({error: true, mensagem: 'Erro durante a exclusão.', tipo: error});
    }
});

// rota GET /filmes/search/code -> buscar filme pelo código
router.get("/search/:code", async (req, res) => {
    try {
        const filmeBuscado = await Filme.findOne({code: req.params.code});
        res.json({filme: filmeBuscado})
    } catch (error) {
        res.json({error: true, mensagem: 'Erro durante a consulta.', tipo: error});
    }
});

// rota PUT /filmes/atualizar/code -> atualizar a nota de um filme
router.put('/atualizar/:code', async (req, res) => {
    try {
        const { code } = req.params;
        const { nota } = req.body;

        // verifica se mandou a nota
        if (nota === undefined) {
            return res.status(400).json({error: "A nova nota é obrigatória."});
        }

        // atualiza o filme
        const filmeAtualizado = await Filme.findOneAndUpdate(
            { code },
            { nota },
            { new: true} // retorna o documento atualizado
        );

        // caso não tenha encontrado o filme
        if (!filmeAtualizado) {
            return res.status(404).json({ error: "Filme não encontrado." });
        }

        res.json({mensagem: "Nota atualizada.", filme: filmeAtualizado});
    } catch (error) {
        res.json({error: true, mensagem: 'Erro durante atualização da nota.', tipo: error});
    }
})

module.exports = router;
