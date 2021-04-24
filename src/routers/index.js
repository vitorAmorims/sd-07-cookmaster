const express = require('express');
// const multer = require('multer');
const { login, users, addRecipe, getAllRecipes } = require('../controllers');

const {
  checkUserData,
  checkedEmailExists,
  checkLoginDataExistsMD,
  validaTokenMD,
  checkedRecipesDataMD } = require('../middleware');

const router = express.Router();
router.use(express.static(`${__dirname}uploads/`));

/* const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
}); */

// const upload = multer({ storage });

router.post('/users', [checkUserData, checkedEmailExists], users);
router.post('/login', [checkLoginDataExistsMD], login);
router.post('/recipes', [validaTokenMD, checkedRecipesDataMD], addRecipe);
router.get('/recipes', getAllRecipes);

module.exports = router;