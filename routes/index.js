const express = require('express');
const path = require('path');

const editId = '/recipes/:id';

const imagesController = require('../controllers/imagesController');
const { upload } = require('../middlewares/imagesMiddleware');

const { validateToken } = require('../middlewares/validateTokenMiddleware');
const { checkRecipeRequiredFields, 
  checkRecipeIsFromUserOrAdmin } = require('../middlewares/recipesMiddleware');

const recipesMiddlewares = [checkRecipeRequiredFields, validateToken];

const usersController = require('../controllers/usersController');

const { checkUserRequiredFields, checkIfExists,
  checkLoginRequiredFields } = require('../middlewares/usersMiddleware');

const usersMiddlewares = [checkUserRequiredFields, checkIfExists];

const recipesController = require('../controllers/recipesController');

const recipesEditMiddlewares = [validateToken, checkRecipeIsFromUserOrAdmin];

const recipesDeleteMiddlewares = [validateToken, checkRecipeIsFromUserOrAdmin];

const recipesImageMiddlewares = [validateToken, upload];

const router = express.Router();
router.use(express.static(path.join(__dirname, '/uploads')));

router.put('/recipes/:id/image', recipesImageMiddlewares, imagesController.sendImage);

router.post('/users', usersMiddlewares, usersController.createUser);

router.post('/login', checkLoginRequiredFields, usersController.signIn);

router.post('/recipes', recipesMiddlewares, recipesController.createRecipe);

router.get('/recipes', recipesController.getRecipes);

router.get(editId, recipesController.getRecipeById);

router.put(editId, recipesEditMiddlewares, recipesController.updateRecipe);

router.delete(editId, recipesDeleteMiddlewares, recipesController.deleteRecipe);

module.exports = router;
