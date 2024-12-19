const { Sequelize } = require('sequelize');

// Configura o Sequelize para usar SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Caminho do arquivo do banco de dados
});

module.exports = sequelize;

