const express = require('express');
const recipesController = require('../controllers/recipesController');
const validateTokenMid = require('../middlewares/validateTokenMid');

const router = express.Router();

router.post('/recipes', validateTokenMid, recipesController.recipesCreate);

module.exports = router;