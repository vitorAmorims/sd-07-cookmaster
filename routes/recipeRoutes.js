const express = require('express');
const { 
    createRecipe,
    deleteRecipe,
    getAllRecipes,
    getRecipeById,
    insertImage,
    updateRecipe,
} = require('../controllers/recipeController');
const validateToken = require('../middlewares/validateToken');
const validateDataRecipe = require('../middlewares/validateDataRecipe');
const validateUser = require('../middlewares/validateUser');
const upload = require('../helpers/uploadMulter');

const router = express.Router();

const endPoint = '/recipes/:id';

router.post('/recipes', validateToken, validateDataRecipe, createRecipe);
router.get('/recipes', getAllRecipes);
router.get(endPoint, getRecipeById);
router.put(endPoint, validateToken, validateDataRecipe, validateUser, updateRecipe);
router.delete(endPoint, validateToken, validateUser, deleteRecipe);
router.put('/recipes/:id/image/', validateToken, validateUser, upload.single('image'), insertImage);

module.exports = router;
