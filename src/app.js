// src/app.js
const express        = require('express');
const cors           = require('cors');
const swaggerUi      = require('swagger-ui-express');
const YAML           = require('yamljs');
const path           = require('path');

// Initialiser la DB au démarrage
require('./config/database');

const articleRoutes  = require('./routes/article.routes');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middlewares globaux ──────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Documentation Swagger ────────────────────────────────────────────────────
const swaggerDoc = YAML.load(path.join(__dirname, '../swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/articles', articleRoutes);

// Route racine
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Blog API - INF222 EC1 TAF1',
    documentation: `http://localhost:${PORT}/api-docs`,
    endpoints: {
      articles: `http://localhost:${PORT}/api/articles`
    }
  });
});

// ── Gestion des routes inconnues ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée.' });
});

// ── Gestion globale des erreurs ──────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Erreur interne du serveur.' });
});

// ── Démarrage ────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Serveur démarré sur http://localhost:${PORT}`);
  console.log(`📄 Documentation Swagger : http://localhost:${PORT}/api-docs\n`);
});

module.exports = app;
