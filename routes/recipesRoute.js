const express = require('express');
const {
  createNewRecipes,
  getAllRecipes,
} = require('../controllers');

const router = express.Router();

router.post('/recipes', createNewRecipes);
router.get('/recipes', getAllRecipes);

module.exports = router;