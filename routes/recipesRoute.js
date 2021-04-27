const express = require('express');
const {
  createNewRecipes,
} = require('../controllers');

const router = express.Router();

router.post('/recipes', createNewRecipes);

module.exports = router;