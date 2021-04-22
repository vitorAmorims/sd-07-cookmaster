const express = require('express');
const router = express.Router();
const middleares = require('../middlewares');
const recipes = require('../controllers/recipesController');
const upload = require('../services/uploadImage')

const routerRecipe = '/recipes/:id';

router.post('/recipes',
    middleares.checkRegisterRecipes,
    middleares.authentication,
    recipes.registerRecipe);

router.get('/recipes', recipes.getAllRecipes);

router.get(routerRecipe, recipes.getById);

router.put(routerRecipe,
    middleares.checkRegisterRecipes,
    middleares.authentication,
    middleares.autthUser,
    recipes.editRecipe);

router.put('/recipes/:id/image', middleares.authentication,
    middleares.autthUser,upload.single('image'), recipes.addImageRecipe)

router.delete(routerRecipe,
    middleares.authentication,
    middleares.autthUser,
    recipes.deleteRecipe);

module.exports = router;