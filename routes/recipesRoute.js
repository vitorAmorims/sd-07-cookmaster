const express = require('express');

const {
  createNewRecipes,
  getAllRecipes,
  getRecipesById,
  updateRecipesById,
  deleteRecipesById,
  uploadImage,
} = require('../controllers');

const uploadImageMiddleware = require('../middleware/uploadImageMiddleware');

const router = express.Router();
router.use(express.static(`${__dirname}/images`));

router.route('/recipes')
  .post(createNewRecipes)
  .get(getAllRecipes);

router.route('/recipes/:id')
  .get(getRecipesById)
  .put(updateRecipesById)
  .delete(deleteRecipesById);

router.put('/recipes/:id/image', uploadImageMiddleware, uploadImage);
// [validateToken, uploadMiddleware], 
// recipe.insertImage);

module.exports = router;