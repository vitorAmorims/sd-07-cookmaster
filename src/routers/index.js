const express = require('express');

const {
  login,
  users,
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe } = require('../controllers');

const recipesId = '/recipes/:id';

const {
  checkUserData,
  checkedEmailExists,
  checkLoginDataExistsMD,
  validaTokenMD,
  checkedRecipesDataMD } = require('../middleware');

const router = express.Router();
router.use(express.static(`${__dirname}uploads/`));

router.post('/users', [checkUserData, checkedEmailExists], users);
router.post('/login', [checkLoginDataExistsMD], login);
router.post('/recipes', [validaTokenMD, checkedRecipesDataMD], addRecipe);
router.get('/recipes', getAllRecipes);
router.get(recipesId, getRecipeById);
router.put(recipesId, validaTokenMD, updateRecipe);
router.delete(recipesId, validaTokenMD, deleteRecipe);

module.exports = router;