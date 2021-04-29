const express = require('express');

const recipeId = '/recipes/:id';
const app = express();

// import users
const { loginMiddleware } = require('../Middlewares/Users/loginMiddleware');
const { middlewareCreateUser } = require('../Middlewares/Users/createUserMiddleware');
const { createUser } = require('../Controllers/Users/createUserController');
const { loginController } = require('../Controllers/Users/loginController');
// Import recipes
const { addRecipeMiddleware } = require('../Middlewares/Recipes/addRecipeMiddleware');
const { addRecipeController } = require('../Controllers/Recipes/addRecipeController');
const { getAllRecipesMiddleware } = require('../Middlewares/Recipes/getAllRecipesMiddleware');
const { getAllRecipesController } = require('../Controllers/Recipes/getAllRecipesController');
const { getRecipeByIdMiddleware } = require('../Middlewares/Recipes/getRecipeByIdMiddleware');
const { getRecipeByIdController } = require('../Controllers/Recipes/getRecipeByIdController');
const { updateRecipeController } = require('../Controllers/Recipes/updateRecipeController');
const { updateRecipeMiddleware } = require('../Middlewares/Recipes/updateRecipeMiddleware');
const { deleteRecipeController } = require('../Controllers/Recipes/deleteRecipeController');
const { deleteRecipeMiddleware } = require('../Middlewares/Recipes/deleteRecipeMiddleware');

// routes
app.get('/', (request, response) => {
    response.send();
});

app.post('/users', middlewareCreateUser, createUser);
app.post('/login', loginMiddleware, loginController);
app.post('/recipes', addRecipeMiddleware, addRecipeController);
app.get('/recipes', getAllRecipesMiddleware, getAllRecipesController);
app.get(recipeId, getRecipeByIdMiddleware, getRecipeByIdController);
app.put(recipeId, updateRecipeMiddleware, updateRecipeController);
app.delete(recipeId, deleteRecipeMiddleware, deleteRecipeController);

module.exports = app;