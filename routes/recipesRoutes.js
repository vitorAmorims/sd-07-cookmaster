const express = require('express');

const multer = require('multer');

const path = require('path');

const recipesController = require('../controllers/recipesController');
const middlewares = require('../middlewares');

const router = express.Router();
router.use(express.json());

const PATH = 'recipes';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });

router.use(express.static(`${__dirname}/uploads`));

router.post(
  `/${PATH}`,
  middlewares.validateToken,
  middlewares.recipeFieldsValidatation,
  recipesController.addRecipe,
);

router.get(`/${PATH}`, recipesController.getAllRecipes);

router.get(`/${PATH}/:id`, recipesController.getRecipeById);

router.use('/images', express.static(path.join(__dirname, '../uploads')));

router.put(
  '/recipes/:id',
  middlewares.validateToken,
  middlewares.recipeFieldsValidatation,
  recipesController.updateRecipe,
);

router.delete(
  '/recipes/:id',
  middlewares.validateToken,
  recipesController.deleteProduct,
);

router.put(
  '/recipes/:id/image',
  [middlewares.validateToken,
  middlewares.addImageValidation,
  upload.single('image')],
  recipesController.addImage,
);

router.use(middlewares.error);

module.exports = router;
