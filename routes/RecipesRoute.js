const express = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const path = require('path');

const RecipesController = require('../controllers/RecipesController');
const {
  recipesValidate,
  tokenValidate,
  idRecipeValidate,
} = require('../middlewares');

const RECIPE_WITH_ID = '/recipes/:id';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/recipes', recipesValidate, tokenValidate, rescue(RecipesController.create));
router.put('/recipes/:id/image',
  tokenValidate,
  upload.single('image'),
  rescue(RecipesController.uploadImage));
router.put(RECIPE_WITH_ID, recipesValidate, tokenValidate, rescue(RecipesController.update));
router.delete(RECIPE_WITH_ID, tokenValidate, rescue(RecipesController.deleteRecipe));
router.get(RECIPE_WITH_ID, idRecipeValidate, rescue(RecipesController.getById));
router.use('/images', express.static(path.join(__dirname, '../uploads')));
router.get('/recipes', rescue(RecipesController.getAll));

module.exports = router;
