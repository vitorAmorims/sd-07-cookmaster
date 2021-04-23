const express = require('express');
const multer = require('multer');
// const path = require('path');

const router = express.Router();

const {
  getAllRecipes,
  getRecipesById,
  postRecipe,
  putRecipe,
  deleteRecipe,
  addImgRecipe,
  // queryRecipeImage,
} = require('../controllers/recipes');

const midvalidateToken = require('../middlewares/doneToken');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${req.params.id}.${file.mimetype.split('/')[1]}`);
  },
});

const upload = multer({ storage });

// router.get('/images/:img', queryRecipeImage);

router.get('/', getAllRecipes);

router.get('/:id', getRecipesById);

router.post('/', midvalidateToken, postRecipe);

router.put('/:id', midvalidateToken, putRecipe);

router.delete('/:id', midvalidateToken, deleteRecipe);

router.put('/:id/image', midvalidateToken, upload.single('image'), addImgRecipe);

module.exports = router;
