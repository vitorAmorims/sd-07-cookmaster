const express = require('express');
const multer = require('multer');
const recipesController = require('../controllers/recipesController');
const { tokenMiddleware } = require('../middlewares');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'uploads'),
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post('/recipes', tokenMiddleware, recipesController.createRecipe);
router.put(
  '/recipes/:id/image',
  [tokenMiddleware, upload.single('image')],
  recipesController.uploadImage,
);
router.get('/recipes', recipesController.getAllRecipes);
router.route('/recipes/:id') // thadeucbr suggestion
  .get(recipesController.getRecipeById)
  .put(tokenMiddleware, recipesController.updateRecipe)
  .delete(tokenMiddleware, recipesController.deleteRecipe);

module.exports = router;