const express = require('express');
const recipesController = require('../controllers/recipesController');
const { validateToken } = require('../middlewares/authMiddleware');

const router = express.Router();
const ROUTE_ID = '/recipes/:id';

router.post('/recipes', validateToken, recipesController.newRecipe);
router.get('/recipes', recipesController.allRecipes);
router.get(ROUTE_ID, recipesController.getByID);
router.put(ROUTE_ID, validateToken, recipesController.updateByID);
router.delete(ROUTE_ID, validateToken, recipesController.deleteByID);

module.exports = router;
