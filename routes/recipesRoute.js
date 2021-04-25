const express = require('express');
const multer = require('multer');
const recipesController = require('../controllers/recipesController');
const { tokenMiddleware } = require('../middlewares');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'uploads'),
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

router.post('/recipes', tokenMiddleware, recipesController.createRecipe);
router.get('/recipes', recipesController.getAllRecipes);
router.route('/recipes/:id') // thadeucbr suggestion
  .get(recipesController.getRecipeById)
  .put(tokenMiddleware, recipesController.updateRecipe)
  .delete(tokenMiddleware, recipesController.deleteRecipe);
router.put(
  '/recipes/:id/image',
  [tokenMiddleware, upload.single('image')],
  recipesController.uploadImage,
);

module.exports = router;