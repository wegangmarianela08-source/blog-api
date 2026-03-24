// src/config/database.js
const sqlite3 = require('sqlite3').verbose();
const path    = require('path');

const DB_PATH = path.join(__dirname, '../../blog.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Erreur connexion DB :', err.message);
  } else {
    console.log('✅ Base de données SQLite connectée');
  }
});

// Création de la table articles si elle n'existe pas
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS articles (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      titre     TEXT    NOT NULL,
      contenu   TEXT    NOT NULL,
      auteur    TEXT    NOT NULL,
      date      TEXT    NOT NULL,
      categorie TEXT    NOT NULL,
      tags      TEXT    NOT NULL DEFAULT '[]'
    )
  `);
});

module.exports = db;
