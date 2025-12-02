const axios = require('axios')

describe("GET /filmes/listar", () => {
    test("Deve retornar uma lista de filmes e status 200", async () => {
        const result = await axios.get("http://localhost:3000/filmes/listar");
        expect(result.status).toBe(200);
        expect(result.data).toHaveProperty("filmes");
        expect(Array.isArray(result.data.filmes)).toBe(true);
    });
});

describe("POST /filmes/inserir", () => {
    test("Deve inserir um filme e status 200", async () => {
        const result = await axios.post("http://localhost:3000/filmes/inserir", {
            "titulo": "Filme Teste Jest",
	        "nota": 1,
	        "code": "jest1"
        });
        expect(result.status).toBe(200);
        expect(result.data).toHaveProperty("mensagem");
    });
});

describe("PUT /filmes/atualizar/:code", () => {
    test("Deve atualizar a nota do filme e status 200", async () => {
        const result = await axios.put("http://localhost:3000/filmes/atualizar/jest1", {
            "nota": 10
        });
        expect(result.status).toBe(200);
        expect(result.data).toHaveProperty("mensagem")
    });
});

describe("DELETE /filmes/excluir/:code", () => {
    test("Deve deletar um filme pelo code e status 200", async () => {
        const result = await axios.delete("http://localhost:3000/filmes/excluir/jest1");
        expect(result.status).toBe(200);
        expect(result.data).toHaveProperty("mensagem")
    });
});

describe("GET /filmes/search/:code", () => {
    test("Deve retonar um filme e status 200", async () => {
        const result = await axios.get("http://localhost:3000/filmes/search/mv1");
        expect(result.status).toBe(200);
        expect(result.data).toHaveProperty("filme")
    });
});