const Seqeulize = require('sequelize');
const db = new Seqeulize('postgres://localhost:5432', {
  logging: false,
});

module.exports = db;
