const express = require('express');
const multer = require('multer');
const validateToken = require('../middlewares/validateToken');
const Recipe = require('../models/recipeModel');

const recipeController = require('../controllers/recipeController');
const uploadController = require('../controllers/uploadController');

const router = express.Router();

const recipePath = '/recipes';
const recipeByIdPath = '/recipes/:id';

router.post(recipePath, validateToken, recipeController.createRecipe);
router.get(recipePath, recipeController.getAllRecipes);
router.get(recipeByIdPath, recipeController.getRecipeById);
router.put(recipeByIdPath, validateToken, recipeController.updateRecipe);
router.delete(recipeByIdPath, validateToken, recipeController.deleteRecipe);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: async (req, file, callback) => {
    const { id } = req.params;
    const recipe = await Recipe.getById(id);
    const { _id: recipeId } = recipe;
    callback(null, `${recipeId}.jpeg`);
  },
});

const upload = multer({ storage });

router.put(
  `${recipeByIdPath}/image`,
  [validateToken, upload.single('image')],
  uploadController.upload,
);

module.exports = router;
