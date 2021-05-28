const express = require('express');
const recipesController = require('../controllers/recipesController');
const validateTokenMid = require('../middlewares/validateTokenMid');

const router = express.Router();

router.post('/recipes', validateTokenMid, recipesController.recipesCreate);
router.get('/recipes/:id', recipesController.getById);
router.get('/recipes', recipesController.getAll);

module.exports = router;