const express = require('express');
const { createRecipeController } = require('../controllers/recipes');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.route('/recipes')
  .post(validateToken, createRecipeController);

module.exports = router;