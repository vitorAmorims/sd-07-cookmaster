const express = require('express');
const recipesController = require('../controllers/recipesController');
const { validateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/recipes', validateToken, recipesController.newRecipe);
router.get('/recipes', recipesController.allRecipes);
router.get('/recipes/:id', recipesController.getByID);
router.put('/recipes/:id', validateToken, recipesController.updateByID);

module.exports = router;
