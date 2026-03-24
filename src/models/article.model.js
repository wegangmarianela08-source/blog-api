// src/models/article.model.js
const db = require('../config/database');

function parseArticle(row) {
  return { ...row, tags: JSON.parse(row.tags || '[]') };
}

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row || null);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

const ArticleModel = {

  async findAll({ categorie, auteur, date } = {}) {
    let query = 'SELECT * FROM articles WHERE 1=1';
    const params = [];
    if (categorie) { query += ' AND categorie = ?'; params.push(categorie); }
    if (auteur)    { query += ' AND auteur = ?';    params.push(auteur); }
    if (date)      { query += ' AND date = ?';      params.push(date); }
    query += ' ORDER BY id DESC';
    const rows = await all(query, params);
    return rows.map(parseArticle);
  },

  async findById(id) {
    const row = await get('SELECT * FROM articles WHERE id = ?', [id]);
    return row ? parseArticle(row) : null;
  },

  async create({ titre, contenu, auteur, date, categorie, tags }) {
    const result = await run(
      'INSERT INTO articles (titre, contenu, auteur, date, categorie, tags) VALUES (?, ?, ?, ?, ?, ?)',
      [titre, contenu, auteur, date || new Date().toISOString().split('T')[0], categorie, JSON.stringify(tags || [])]
    );
    return this.findById(result.lastID);
  },

  async update(id, { titre, contenu, categorie, tags }) {
    const article = await this.findById(id);
    if (!article) return null;
    const updated = {
      titre:     titre     ?? article.titre,
      contenu:   contenu   ?? article.contenu,
      categorie: categorie ?? article.categorie,
      tags:      tags      ?? article.tags,
    };
    await run(
      'UPDATE articles SET titre = ?, contenu = ?, categorie = ?, tags = ? WHERE id = ?',
      [updated.titre, updated.contenu, updated.categorie, JSON.stringify(updated.tags), id]
    );
    return this.findById(id);
  },

  async delete(id) {
    const result = await run('DELETE FROM articles WHERE id = ?', [id]);
    return result.changes > 0;
  },

  async search(query) {
    const like = `%${query}%`;
    const rows = await all(
      'SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ? ORDER BY id DESC',
      [like, like]
    );
    return rows.map(parseArticle);
  }
};

module.exports = ArticleModel;
