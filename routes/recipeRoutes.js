const express = require('express');
const multer = require('multer');
const path = require('path');

const recipe = require('../models/recipeModel');
const recipeController = require('../controllers/recipeController');
const middlewares = require('../middlewares');

const uploadFolder = path.resolve(__dirname, '../public/images');
express.static(uploadFolder);

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(req, file, callback) {      
      const fileName = `${req.params.id}.jpeg`;
      return callback(null, fileName);
    },
  }),
});

const URL_RECIPES_ID = '/recipes/:id';

const router = express.Router();

router.get('/recipes', recipeController.allRecipes);
router.get(
  URL_RECIPES_ID,
  middlewares.validateRecipeExistsMiddleware, 
  recipeController.oneRecipe,
  );
router.put(
  URL_RECIPES_ID,
  middlewares.verifyTokenUpdateRecipeMiddleware,
  recipeController.updateOneRecipe,
  ); 
router.post(
  '/recipes',
  middlewares.validateEntriesRecipeMiddleware,
  middlewares.verifyTokenMiddleware,   
  recipeController.createRecipe,
);
router.delete(
  URL_RECIPES_ID,
  middlewares.verifyTokenUpdateRecipeMiddleware,
  recipeController.deleteRecipe,
  );

router.put(
  '/recipes/:id/image/',
  upload.single('image'),
  middlewares.verifyTokenUpdateRecipeMiddleware, 
  async (req, res) => {
  const image = `localhost:3000/images/${req.file.filename}`;
  const { tokenUserId, tokenUserRole, recipeUserId } = req;
  if (tokenUserId !== recipeUserId && tokenUserRole !== 'admin') {
    return res.status(404).json({ message: 'Não tem autorização para Adicionar imagem' });
  }
  const { id } = req.params;
  const oneRecipe = await recipe.getById(id);
  const { name, ingredients, preparation, userId } = oneRecipe;
  await recipe.updateWithImage(id, oneRecipe, image);  
  return res.status(200).json({ _id: id, name, ingredients, preparation, userId, image });
},
);
router.get('/images/:image', (req, res) => {
  const { image } = req.params;
  return res.status(200).render(`/images/${image}`);
});

module.exports = router;