const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

// Inicializa o servidor
const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Banco de Dados SQLite
const db = new sqlite3.Database("./clientes.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conectado ao banco de dados SQLite.");
  }
});

// Cria a tabela de clientes
db.run(
  `CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL,
    cpf TEXT NOT NULL,
    contato TEXT,
    cep TEXT,
    numero TEXT,
    cidade TEXT,
    estado TEXT
  )`,
  (err) => {
    if (err) {
      console.error("Erro ao criar tabela:", err.message);
    }
  }
);

// Rotas

// Buscar todos os clientes
app.get("/api/clientes", (req, res) => {
  db.all("SELECT * FROM clientes", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Adicionar um novo cliente
app.post("/api/clientes", (req, res) => {
  const { nome, email, cpf, contato, cep, numero, cidade, estado } = req.body;
  const query = `INSERT INTO clientes (nome, email, cpf, contato, cep, numero, cidade, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(query, [nome, email, cpf, contato, cep, numero, cidade, estado], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID });
    }
  });
});

// Editar um cliente existente
app.put("/api/clientes/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, contato, cep, numero, cidade, estado } = req.body;
  const query = `UPDATE clientes SET nome = ?, email = ?, cpf = ?, contato = ?, cep = ?, numero = ?, cidade = ?, estado = ? WHERE id = ?`;

  db.run(query, [nome, email, cpf, contato, cep, numero, cidade, estado, id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ changes: this.changes });
    }
  });
});

// Excluir um cliente
app.delete("/api/clientes/:id", (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM clientes WHERE id = ?`;

  db.run(query, [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ changes: this.changes });
    }
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
