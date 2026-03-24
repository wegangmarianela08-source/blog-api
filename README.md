# 📝 Blog API — INF222 EC1 TAF1

API Backend RESTful pour la gestion d'un blog simple, développée avec **Node.js (Express)** et **SQLite**.

---

## 🚀 Installation et démarrage

### 1. Cloner le dépôt
```bash
git clone https://github.com/TON_USERNAME/blog-api.git
cd blog-api
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Démarrer le serveur
```bash
# Mode production
npm start

# Mode développement (rechargement automatique)
npm run dev
```

Le serveur démarre sur **http://localhost:3000**

---

## 📄 Documentation Swagger

Accéder à la documentation interactive : **http://localhost:3000/api-docs**

---

## 📁 Structure du projet

```
blog-api/
├── src/
│   ├── app.js                    # Point d'entrée
│   ├── config/
│   │   └── database.js           # Connexion SQLite
│   ├── models/
│   │   └── article.model.js      # Requêtes DB
│   ├── controllers/
│   │   └── article.controller.js # Logique métier
│   ├── routes/
│   │   └── article.routes.js     # Définition des routes
│   └── middlewares/
│       └── validate.js           # Validation des entrées
├── swagger.yaml                  # Documentation API
├── package.json
├── .gitignore
└── README.md
```

---

## 🔗 Endpoints de l'API

| Méthode | Endpoint                        | Description                         |
|---------|---------------------------------|-------------------------------------|
| GET     | `/api/articles`                 | Récupérer tous les articles         |
| GET     | `/api/articles?categorie=Tech`  | Filtrer par catégorie/auteur/date   |
| GET     | `/api/articles/:id`             | Récupérer un article par ID         |
| POST    | `/api/articles`                 | Créer un article                    |
| PUT     | `/api/articles/:id`             | Modifier un article                 |
| DELETE  | `/api/articles/:id`             | Supprimer un article                |
| GET     | `/api/articles/search?query=..` | Rechercher dans titre et contenu    |

---

## 📌 Exemples d'utilisation

### Créer un article
```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "titre": "Introduction à Node.js",
    "contenu": "Node.js est un environnement d'exécution JavaScript...",
    "auteur": "Alice",
    "categorie": "Technologie",
    "tags": ["nodejs", "javascript", "backend"]
  }'
```

**Réponse (201) :**
```json
{
  "success": true,
  "message": "Article créé avec succès.",
  "article": {
    "id": 1,
    "titre": "Introduction à Node.js",
    "contenu": "Node.js est un environnement d'exécution JavaScript...",
    "auteur": "Alice",
    "date": "2026-03-23",
    "categorie": "Technologie",
    "tags": ["nodejs", "javascript", "backend"]
  }
}
```

### Récupérer tous les articles
```bash
curl http://localhost:3000/api/articles
```

### Filtrer par catégorie et date
```bash
curl "http://localhost:3000/api/articles?categorie=Tech&date=2026-03-23"
```

### Récupérer un article par ID
```bash
curl http://localhost:3000/api/articles/1
```

### Modifier un article
```bash
curl -X PUT http://localhost:3000/api/articles/1 \
  -H "Content-Type: application/json" \
  -d '{"titre": "Nouveau titre", "categorie": "Dev"}'
```

### Supprimer un article
```bash
curl -X DELETE http://localhost:3000/api/articles/1
```

### Rechercher
```bash
curl "http://localhost:3000/api/articles/search?query=javascript"
```

---

## ✅ Codes HTTP utilisés

| Code | Signification                        |
|------|--------------------------------------|
| 200  | OK — Requête réussie                 |
| 201  | Created — Ressource créée            |
| 400  | Bad Request — Données invalides      |
| 404  | Not Found — Article introuvable      |
| 500  | Internal Server Error — Erreur serveur |

---

## 🛠️ Technologies

- **Runtime** : Node.js
- **Framework** : Express.js
- **Base de données** : SQLite (via better-sqlite3)
- **Documentation** : Swagger UI (swagger-ui-express)

---

## 👤 Auteur

Étudiant — L2 Informatique, Université de Yaoundé I  
UE : INF222 — EC1 Développement Backend
