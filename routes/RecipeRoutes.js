const express = require('express');
const RecipesController = require('../Controllers/RecipesController');
const middlewareToken = require('../Middlewares/middlewareToken');

const router = express.Router();

router.post("/recipes", middlewareToken.validateToken ,RecipesController.addRecipes);

module.exports = router;