const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const clienteRoutes = require('./routes/clientes'); // Caminho para este arquivo

const app = express();
const port = 5001;

app.use(cors()); // Permite requisições de origens diferentes
app.use(bodyParser.json()); // Permite parsear JSON no corpo da requisição

app.use('/api/clientes', clienteRoutes); // Define o prefixo das rotas de clientes

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
