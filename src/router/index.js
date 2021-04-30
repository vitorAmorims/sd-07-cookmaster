const express = require('express');
const controller = require('../controller');

const router = express.Router();

const recipeIdURL = '/recipes/:id';

router.post('/users', controller.createUser);
router.post('/login', '');
router.post('/recipes', '');
router.get('/recipes', '');
router.get(recipeIdURL, '');
router.put(recipeIdURL, '');
router.delete(recipeIdURL, '');

module.exports = router;