const express = require('express');

const {
  login,
  users,
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe } = require('../controllers');

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
router.get('/recipes/:id', getRecipeById);
router.put('/recipes/:id', validaTokenMD, updateRecipe);

module.exports = router;