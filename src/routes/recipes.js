const Router = require('express').Router();
const multer = require('multer');
const {
  register,
  getAll,
  getRecipe,
  editRecipe,
  deleteRecipe,
  addImage } = require('../controller/recipes');
const { recipeInfoTest, tokenValidation, tokenExists } = require('../middlewares/recipes');

const dir = __dirname.replace('/routes', '');
const path = `${dir}/image/`;
const RECIPE_ID = '/recipes/:id';
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path);
  },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  } });
const upload = multer({ storage });

Router.get(RECIPE_ID, getRecipe);
Router.put(
  RECIPE_ID,
  tokenExists,
  tokenValidation,
  editRecipe,
  );
Router.delete(
    RECIPE_ID, tokenExists, tokenValidation, deleteRecipe, 
  );
Router.put('/recipes/:id/image', tokenExists, tokenValidation, upload.single('image', 2), addImage);
Router.post('/recipes', tokenValidation, recipeInfoTest, register);
Router.get('/recipes', getAll);

module.exports = Router;