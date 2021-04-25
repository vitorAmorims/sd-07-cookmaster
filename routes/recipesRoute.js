const express = require('express');
const recipesControllers = require('../controllers/recipesControllers');
const authorizationToken = require('../middlewares/validateToken');

const router = express.Router();

const recipe = '/recipes'; 

router.post(recipe, authorizationToken, recipesControllers.addNewRecipe);
router.get(recipe, recipesControllers.getAllRecipes);
router.get(`${recipe}/:id`, recipesControllers.getRecipesById);
router.put(`${recipe}/:id`, authorizationToken, recipesControllers.changeRecipes);
router.delete(`${recipe}/:id`, authorizationToken, recipesControllers.deleteRecipe);

module.exports = router;
