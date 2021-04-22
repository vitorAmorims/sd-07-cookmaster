const express = require('express');
const verify = require('../Middleware/Verify/recipesVerify');
const { verifyJWT } = require('../Middleware/jwtVerify');
const { createRecipe } = require('../models/recipesModel');

const router = express.Router();

router.post('/recipes', verifyJWT, verify.createRecipe, async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const recipe = await createRecipe(name, ingredients, preparation);
  return res.status(201).json({ recipe });
});

module.exports = router;