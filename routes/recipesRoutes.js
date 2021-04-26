const express = require('express');
// const multer = require("multer");
const recipesController = require('../controllers/recipesController');
const middlewares = require('../middlewares');

const router = express.Router();
// router.use(express.static(__dirname + 'uploads/'));

// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'uploads/');
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   }
// })

// const upload = multer({storage});

router.post('/recipes',
  middlewares.validateRecipe,
  middlewares.authMiddleware,
  recipesController.addRecipe);
router.get('/recipes', recipesController.getRecipes);
router.get('/recipes/:id', recipesController.getRecipeById);
router.put('/recipes/:id',
  middlewares.authMiddleware,
  recipesController.updateRecipe);

// router.post('/recipes/:id/image/',
//   middlewares.authMiddleware,
//   upload.single('file'),
//   recipesController.uploadImage);

router.use(middlewares.errorMiddleware);

module.exports = router;