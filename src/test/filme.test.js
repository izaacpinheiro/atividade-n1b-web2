const axios = require('axios')

describe("Teste de rota GET /filmes/listar", () => {
    test('Deve retornar status 200 e uma lista de filmes', async () => {
        const result = await axios.get('http://localhost:3000/filmes/listar');
        expect(result.status).toBe(200);
        expect(result.data).toHaveProperty("filmes");
        expect(Array.isArray(resposta.data.filmes)).toBe(true);
    });
});

describe("Teste de rota POST /filmes/inserir", () => {
    test('Deve retornar status 200 e mensagem confirmando inserção.', async () => {
        await axios.post('http://localhost:3000/filmes/inserir', {
            "titulo": "A Bruxa de Blair",
	        "nota": 10,
	        "code": "mv5"
        });
        const result = await axios.get('http://localhost:3000/filmes/search/mv5');
        expect(result.data.filmes).toBeTruthy();
        expect(result.data.filmes.titulo).toBeTruthy();
    });
});