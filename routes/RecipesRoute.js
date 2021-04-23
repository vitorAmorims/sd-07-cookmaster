const express = require('express');
const rescue = require('express-rescue');
const RecipesController = require('../controllers/RecipesController');
const { recipesValidate, tokenValidate } = require('../middlewares');

const router = express.Router();

router.post('/recipes', recipesValidate, tokenValidate, rescue(RecipesController.create));
router.get('/recipes', rescue(RecipesController.getAll));

module.exports = router;
