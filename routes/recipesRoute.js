const express = require('express');
const verify = require('../Middleware/Verify/recipesVerify');
const { verifyJWT } = require('../Middleware/jwtVerify');
const { createRecipe, 
  getRecipes, 
  getRecipeById, 
  updateRecipeById, 
  deleteRecipeById } = require('../models/recipesModel');
const upload = require('../Middleware/upload');

const idEndpoint = '/recipes/:id';

const router = express.Router();

router.post('/recipes', verifyJWT, verify.createRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const recipe = await createRecipe(name, ingredients, preparation);
  return res.status(201).json({ recipe });
});

router.post('/recipes/:id/image', 
  verifyJWT, 
  upload.single('image'), 
  (req, res) => res.json(200).json({}));

router.get('/recipes', async (req, res) => {
  const recipes = await getRecipes();
  return res.status(200).json(recipes);
});

router.get(idEndpoint, async (req, res) => {
  const { id } = req.params;
  const recipes = await getRecipeById(id);
  if (!recipes) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  return res.status(200).json(recipes);
});

router.put(idEndpoint, verifyJWT, verify.createRecipe, async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const recipe = await updateRecipeById(id, name, ingredients, preparation);
  return res.status(200).json(recipe);
});

router.delete(idEndpoint, verifyJWT, async (req, res) => {
  const { id } = req.params;
  await deleteRecipeById(id);
  return res.status(204).json();
});

module.exports = router;