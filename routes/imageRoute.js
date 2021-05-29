const express = require('express');

const imageController = require('../controllers/recipeController');
const middlewares = require('../middlewares');

const router = express.Router();

router.put('/recipes/:id/image/',
  middlewares.token,
  middlewares.isLogged,
  middlewares.multer.single('image'),
  imageController.addImageRecipe);
router.get('/images/:id', middlewares.token, middlewares.isLogged, imageController.getImageId);

module.exports = router;
