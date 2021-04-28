const express = require('express');
const multer = require('multer');
const recipeController = require('../controllers/recipeController');
const { validateToken, validateRecipe, validateId } = require('../middlewares');

const router = express.Router();
const idRoute = '/recipes/:id';

router.use(express.static(`${__dirname}uploads/`));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, `${req.params.id}.jpeg`);
    },
});

const upload = multer({ storage });

router.post('/recipes', validateToken, validateRecipe, recipeController.createRecipe);
router.get('/recipes', recipeController.getAllRecipe);
router.get(idRoute, validateId, recipeController.getRecipeById);
router.delete(idRoute, validateToken, validateId, recipeController.excludeRecipe);
router.put(idRoute, validateToken, validateId, recipeController.editRecipe);
router.put(
    '/recipes/:id/image',
    [validateToken, validateId, upload.single('image')],
    recipeController.addRecipeImage,
);

module.exports = router;