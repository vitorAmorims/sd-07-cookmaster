const express = require('express');
const recipesController = require('../controllers/recipesController');
const validateTokenMid = require('../middlewares/validateTokenMid');

const router = express.Router();

const recipeId = '/recipes/:id';

router.post('/recipes', validateTokenMid, recipesController.recipesCreate);
router.get(recipeId, recipesController.getById);
router.get('/recipes', recipesController.getAll);
router.put(recipeId, validateTokenMid, recipesController.update);
router.delete(recipeId, validateTokenMid, recipesController.remove);

module.exports = router;