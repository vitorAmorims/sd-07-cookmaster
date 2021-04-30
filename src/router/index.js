const express = require('express');
const controller = require('../controller');
const middleware = require('../middlewares');

const router = express.Router();

const recipeIdURL = '/recipes/:id';

router.post('/users',
  middleware.validationName,
  middleware.validationEmail,
  middleware.validationPassword,
  controller.createUser);
router.post('/login', '');
router.post('/recipes', '');
router.get('/recipes', '');
router.get(recipeIdURL, '');
router.put(recipeIdURL, '');
router.delete(recipeIdURL, '');

module.exports = router;
