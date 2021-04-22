const express = require('express');
const multer = require('multer');
const verify = require('../Middleware/Verify/recipesVerify');
const { verifyJWT } = require('../Middleware/jwtVerify');
const { createRecipe, 
  getRecipes, 
  getRecipeById, 
  updateRecipeById, 
  deleteRecipeById, 
  insertImage } = require('../models/recipesModel');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'images');
    },
    filename: (req, file, callback) => {
      callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const idEndpoint = '/recipes/:id';

const router = express.Router();

router.post('/recipes', [verifyJWT, verify.createRecipe], async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const recipe = await createRecipe(name, ingredients, preparation);
  return res.status(201).json({ recipe });
});

router.put('/recipes/:id/image', [verifyJWT, upload.single('image')], async (req, res) => {
  const { id } = req.params;
  const result = await insertImage(req.params.id, `${req.hostname}:3000/images/${id}.jpeg`);
  return res.status(200).json(result.value);
});

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

router.put(idEndpoint, [verifyJWT, verify.createRecipe], async (req, res) => {
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