const express = require('express');
const { recipesController } = require('../controller');
const middlewares = require('../middleware');

const router = express.Router();

const { validateTokenMiddleware } = middlewares;

router.post('/recipes',
validateTokenMiddleware,
recipesController.createRecipe);

router.get('/recipes', recipesController.getAllRecipes);

// router.get('/recipes/:id', );

// router.put('/recipes/:id', );

// router.delete('/recipes/:id', );

module.exports = router;