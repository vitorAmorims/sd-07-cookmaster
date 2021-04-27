const express = require('express');
const multer = require('multer');

const FILE_PATH = `${__dirname}uploads/`;

const {
  login,
  users,
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage } = require('../controllers');

const recipesId = '/recipes/:id';

const {
  checkUserData,
  checkedEmailExists,
  checkLoginDataExistsMD,
  validaTokenMD,
  checkedRecipesDataMD } = require('../middleware');

const router = express.Router();

router.use(express.static(FILE_PATH));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
      callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
      const { id } = req.params;
      callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

router.post('/users', [checkUserData, checkedEmailExists], users);
router.post('/login', [checkLoginDataExistsMD], login);
router.post('/recipes', [validaTokenMD, checkedRecipesDataMD], addRecipe);
router.get('/recipes', getAllRecipes);
router.get(recipesId, getRecipeById);
router.put(`${recipesId}/image/`, [validaTokenMD, upload.single('image')], uploadImage);
router.put(recipesId, validaTokenMD, updateRecipe);
router.delete(recipesId, validaTokenMD, deleteRecipe);

module.exports = router;