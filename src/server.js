// arquivo responsável por rodar o servidor localmente para testes
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor local rodando na porta ${PORT}`);
});