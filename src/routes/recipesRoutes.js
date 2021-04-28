const express = require('express');
const { recipesController } = require('../controllers');

const ROUTE_RECIPE_ID = '/recipes/:id';

const router = express.Router();

router.get('/recipes', recipesController.getAll);

router.get(ROUTE_RECIPE_ID, recipesController.getById);

router.post('/recipes', recipesController.add);

router.put(ROUTE_RECIPE_ID, recipesController.update);

router.delete(ROUTE_RECIPE_ID, recipesController.deleteRecipe);

module.exports = router;