const express = require('express');
const multer = require('multer');
const controller = require('../controller');
const middleware = require('../middlewares');

const router = express.Router();
const recipeURL = '/recipes';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

router.post('/users',
  middleware.validationName,
  middleware.validationEmailCreate,
  middleware.validationPassword,
  controller.createUser);

router.post('/login',
  middleware.validationPasswordLogin,
  middleware.validationEmail,
  controller.login);

router.put(`${recipeURL}/:id/image`,
  middleware.recipeIdNotFound,
  middleware.validationToken,
  upload.single('image'),
  controller.putImage);

router.post(recipeURL,
  middleware.validationName,
  middleware.validationRecipes,
  middleware.validationToken,
  controller.createRecipe);

router.get(recipeURL, controller.getRecipes);

router.get(`${recipeURL}/:id`, middleware.recipeIdNotFound, controller.getRecipeById);

router.put(`${recipeURL}/:id`,
  middleware.validationName,
  middleware.validationRecipes,
  middleware.validationToken,
  controller.updateRecipe);

router.delete(`${recipeURL}/:id`,
  middleware.validationToken,
  middleware.recipeIdNotFound,
  controller.deleteRecipe);

module.exports = router;
