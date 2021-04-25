const express = require('express');
const multer = require('multer');

const router = express.Router();

const {
  createRecipe,
  getAllRecipes,
  getRecipesById,
  updateRecipe,
  deleteRecipe,
  addImgRecipe,
} = require('../Controller/RecipesController');

const validateToken = require('../Middlewares/token');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.id}.${file.mimetype.split('/')[1]}`);
  },
});

const upload = multer({ storage });

router.get('/', getAllRecipes);

router.get('/:id', getRecipesById);

router.post('/', validateToken, createRecipe);

router.put('/:id', validateToken, updateRecipe);

router.delete('/:id', validateToken, deleteRecipe);

router.put('/:id/image', validateToken, upload.single('image'), addImgRecipe);

module.exports = router;