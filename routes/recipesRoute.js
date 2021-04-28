const express = require('express');
const recipesController = require('../controllers/recipesController');
const middlewares = require('../middlewares');

const router = express.Router();

const route = '/recipes/:id';

// #3 endpoint para o cadastro de receitas
// autenticar usuário
router.post('/recipes',
middlewares.recipesEntriesMiddleware,
middlewares.validateToken,
recipesController.createRecipe);

// #4 endpoint para a listagem de receitas
// sem autenticar usuário
router.get('/recipes',
  recipesController.getAllRecipes);

// #5 endpoint para visualizar uma receita específica
// sem autenticar usuário
router.get(route,
  middlewares.recipesIdMiddleware,
  recipesController.getRecipeById);

// #7 endpoint para a edição de uma receita
// autenticar usuário
// validar se usuário logado é o da receita ou admin
router.put(route,
  middlewares.validateToken,
  middlewares.loggedInMiddleware,
  recipesController.updateRecipe);

// #8 endpoint para a exclusão de uma receita
// autenticar usuário
// validar se usuário logado é o da receita ou admin
router.delete(route,
  middlewares.validateToken,
  middlewares.loggedInMiddleware,
  recipesController.deleteRecipe);

module.exports = router;
