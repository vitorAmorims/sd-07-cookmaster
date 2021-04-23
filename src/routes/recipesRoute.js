const express = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const path = require('path');

const recipesController = require('../controllers/recipesController');
const authMiddleware = require('../middlewares/auth');

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

const endpointWithId = '/recipes/:id';

router.post('/recipes', authMiddleware, rescue(recipesController.createRecipe));
router.get('/recipes', rescue(recipesController.getAllRecipes));
router.get(endpointWithId, rescue(recipesController.getRecipeById));
router.put(
  endpointWithId,
  authMiddleware,
  rescue(recipesController.updateRecipe),
);
router.delete(
  endpointWithId,
  authMiddleware,
  rescue(recipesController.deleteRecipe),
);
router.put(
  '/recipes/:id/image/',
  authMiddleware,
  upload.single('image'),
  rescue(recipesController.postPhoto),
);

module.exports = router;
