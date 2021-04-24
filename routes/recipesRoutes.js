const express = require('express');
const recipesController = require('../controllers/recipesController');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/recipes', middlewares.authMiddleware, recipesController.addRecipe);

router.use(middlewares.errorMiddleware);

module.exports = router;