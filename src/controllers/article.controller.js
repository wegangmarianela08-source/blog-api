// src/controllers/article.controller.js
const ArticleModel = require('../models/article.model');

const ArticleController = {

  async getAll(req, res) {
    try {
      const { categorie, auteur, date } = req.query;
      const articles = await ArticleModel.findAll({ categorie, auteur, date });
      res.status(200).json({ success: true, count: articles.length, articles });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Erreur serveur.', error: err.message });
    }
  },

  async search(req, res) {
    try {
      const { query } = req.query;
      if (!query || query.trim() === '') {
        return res.status(400).json({ success: false, message: 'Le paramètre "query" est requis.' });
      }
      const articles = await ArticleModel.search(query.trim());
      res.status(200).json({ success: true, count: articles.length, articles });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Erreur serveur.', error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const article = await ArticleModel.findById(Number(req.params.id));
      if (!article) return res.status(404).json({ success: false, message: 'Article non trouvé.' });
      res.status(200).json({ success: true, article });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Erreur serveur.', error: err.message });
    }
  },

  async create(req, res) {
    try {
      const article = await ArticleModel.create(req.body);
      res.status(201).json({ success: true, message: 'Article créé avec succès.', article });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Erreur serveur.', error: err.message });
    }
  },

  async update(req, res) {
    try {
      const article = await ArticleModel.update(Number(req.params.id), req.body);
      if (!article) return res.status(404).json({ success: false, message: 'Article non trouvé.' });
      res.status(200).json({ success: true, message: 'Article mis à jour.', article });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Erreur serveur.', error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await ArticleModel.delete(Number(req.params.id));
      if (!deleted) return res.status(404).json({ success: false, message: 'Article non trouvé.' });
      res.status(200).json({ success: true, message: 'Article supprimé avec succès.' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Erreur serveur.', error: err.message });
    }
  }
};

module.exports = ArticleController;
