const express = require('express');
const rescue = require('express-rescue');
const multer = require('multer');
const fs = require('fs');

const { validateTokenMiddleware } = require('../../middlewares');

const FOLDER_NAME = 'images';
const UPLOAD_PATH = `./${FOLDER_NAME}`;

if (!fs.existsSync(UPLOAD_PATH)) {
  fs.mkdirSync(UPLOAD_PATH);
}

const router = express.Router();
router.use(express.static(`${__dirname}/${FOLDER_NAME}`));

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, `${FOLDER_NAME}/`);
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

const { 
  createRecipe,
  findAllRecipes,
  findRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
  findImageById,
} = require('./recipeController');

const recipeValidateMiddleware = require('./recipeValidateMiddleware');

const BASE_ENDPOINT = '/recipes';
const BASE_ENDPOINT_IMAGES = '/images';

router.post(BASE_ENDPOINT,
  [validateTokenMiddleware, recipeValidateMiddleware], 
  rescue(createRecipe));
router.get(BASE_ENDPOINT, rescue(findAllRecipes));
router.get(`${BASE_ENDPOINT}/:id`, rescue(findRecipeById));
router.put(`${BASE_ENDPOINT}/:id`,
  [validateTokenMiddleware, recipeValidateMiddleware],
  rescue(updateRecipe));
router.delete(`${BASE_ENDPOINT}/:id`, validateTokenMiddleware, rescue(deleteRecipe));
router.put(`${BASE_ENDPOINT}/:id/image/`, 
  [validateTokenMiddleware, upload.single('image')], 
  rescue(uploadImage));
router.get(`${BASE_ENDPOINT_IMAGES}/:id`, rescue(findImageById));
module.exports = router; 
