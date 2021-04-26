const express = require('express');
// const multer = require('multer');
const {
  saveRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipeById,
  deleteRecipeById,
  addImage,
} = require('../controllers/recipesControllers');

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (_req, _file, callback) => {
//     callback(null, 'uploads/');
//   },
//   filename: (req, _file, callback) => {
//     const name = req.params.id;
//     callback(null, name + '.jpeg');
//   },
// });

// const upload = multer({ storage });

router
  .route('/recipes')
  .post(saveRecipe)
  .get(getAllRecipes);

router
  .route('/recipes/:id')
  .get(getRecipeById)
  .put(updateRecipeById)
  .delete(deleteRecipeById);

router.put('/recipes/:id/image', addImage);

module.exports = router;
