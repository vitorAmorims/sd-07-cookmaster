const express = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const path = require('path');

const recipeController = require('../controllers/recipesController');
const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

const router = express.Router();
router.use(express.static(path.join(__dirname, 'uploads/')));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

const endPointId = '/recipes/:id';

router.post('/recipes', authorizationMiddleware, rescue(recipeController.createRecipe));
router.get('/recipes', rescue(recipeController.getAllRecipes));
router.get(endPointId, rescue(recipeController.getRecipeById));
router.put(
  endPointId,
  authorizationMiddleware,
  rescue(recipeController.updateRecipe),
);
router.delete(
  endPointId,
  authorizationMiddleware,
  rescue(recipeController.deleteRecipe),
);
router.put(
  '/recipes/:id/image/',
  authorizationMiddleware,
  upload.single('image'),
  rescue(recipeController.pictureUpload),
);

module.exports = router;
