const express = require('express');
const cors = require('cors'); // Importando o pacote cors
const app = express();
const port = 5001;

// Usando o middleware CORS para permitir requisições de qualquer origem
app.use(cors());

// Dados fictícios de clientes
const clientes = [
  { id: 1, nome: "João Silva", email: "joao@gmail.com", cpf: "12345678900", contato: "(11) 98765-4321", cep: "12345-678", numero: "123", cidade: "São Paulo", estado: "SP" },
  { id: 2, nome: "Maria Oliveira", email: "maria@gmail.com", cpf: "98765432100", contato: "(11) 91234-5678", cep: "54321-123", numero: "456", cidade: "Rio de Janeiro", estado: "RJ" }
];

// Endpoint para retornar os clientes
app.get('/api/clientes', (req, res) => {
  res.json(clientes);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
