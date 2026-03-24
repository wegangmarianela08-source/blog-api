// src/middlewares/validate.js

/**
 * Valide les champs obligatoires à la création d'un article
 */
function validateCreate(req, res, next) {
  const { titre, contenu, auteur, categorie } = req.body;
  const errors = [];

  if (!titre   || titre.trim() === '')    errors.push('Le champ "titre" est obligatoire.');
  if (!contenu || contenu.trim() === '')  errors.push('Le champ "contenu" est obligatoire.');
  if (!auteur  || auteur.trim() === '')   errors.push('Le champ "auteur" est obligatoire.');
  if (!categorie || categorie.trim() === '') errors.push('Le champ "categorie" est obligatoire.');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  next();
}

/**
 * Valide qu'au moins un champ modifiable est présent à la mise à jour
 */
function validateUpdate(req, res, next) {
  const { titre, contenu, categorie, tags } = req.body;

  if (!titre && !contenu && !categorie && !tags) {
    return res.status(400).json({
      success: false,
      errors: ['Fournissez au moins un champ à modifier : titre, contenu, categorie ou tags.']
    });
  }

  next();
}

module.exports = { validateCreate, validateUpdate };
