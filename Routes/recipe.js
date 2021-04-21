const express = require('express');
const multer = require('multer');
const recipe = require('../Controller/recipe');
const validateToken = require('../middlewares/validateToken');
const recipeService = require('../Service/recipe');

const router = express.Router();
router.use(express.static(`${__dirname}/images`));

router.route('/recipes')
  .post(validateToken, recipe.create)
  .get(recipe.getAllRecipes);

router.route('/recipes/:id')
  .get(recipe.getById)
  .put(validateToken, recipe.updateRecipe)
  .delete(validateToken, recipe.deleteRecipe);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images/');
   },
  filename: (req, file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

const upload = multer({ storage });
router.put('/recipes/:id/image/', [validateToken, upload.single('image')], async (req, res) => {
  try {
    const result = await recipeService
      .insertImage(req.params.id, `localhost:3000/${req.file.path}`);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

router.get('/images/:id', (req, res) => {
  try {
    console.log(`localhost:3000${req.url}`);
    res.sendFile(req.url, { root: './' });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;