const express = require('express');
const verify = require('../Middleware/Verify/recipesVerify');
const { verifyJWT } = require('../Middleware/jwtVerify');
const { createRecipe, getRecipes, getRecipeById } = require('../models/recipesModel');

const router = express.Router();

router.post('/recipes', verifyJWT, verify.createRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const recipe = await createRecipe(name, ingredients, preparation);
  return res.status(201).json({ recipe });
});

router.get('/recipes', async (req, res) => {
  const recipes = await getRecipes();
  return res.status(200).json(recipes);
});

router.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const recipes = await getRecipeById(id);
  console.log(recipes);
  if (!recipes) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(200).json(recipes);
});

module.exports = router;