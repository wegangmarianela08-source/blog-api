// src/routes/article.routes.js
const express = require('express');
const router  = express.Router();
const ArticleController               = require('../controllers/article.controller');
const { validateCreate, validateUpdate } = require('../middlewares/validate');

// IMPORTANT : /search avant /:id pour éviter le conflit de routes
router.get('/search',  ArticleController.search);

router.get('/',        ArticleController.getAll);
router.get('/:id',     ArticleController.getById);
router.post('/',       validateCreate, ArticleController.create);
router.put('/:id',     validateUpdate, ArticleController.update);
router.delete('/:id',  ArticleController.delete);

module.exports = router;
