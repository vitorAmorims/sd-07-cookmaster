const express = require('express');
const multer = require('multer');

const userController = require('../controllers/userControllers');
const loginController = require('../controllers/loginControllers');
const recipesController = require('../controllers/recipesController');
const tokenValidate = require('../auth/validateToken');

const recipe = '/recipes/:id';
const router = express.Router();

// router.use('/images', express.static(`${__dirname}uploads/`));

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        // const { id } = req.params;
        callback(null, `${req.params.id}.jpeg`);
    },
});

const upload = multer({ storage });
// router.get('/users', userController.getAllUsers);
router.post('/users', userController.registerUser);
router.post('/login', loginController.loginUser);

router.get('/recipes', recipesController.getAllRecipes);
router.get(recipe, recipesController.getById);
router.post('/recipes', tokenValidate, recipesController.createRecipes);
router.put(recipe, tokenValidate, recipesController.updateRecipes);
router.delete(recipe, tokenValidate, recipesController.deleteRecipe);
router.put('/recipes/:id/image/', tokenValidate, upload.single('image'),
    recipesController.updateImage);

module.exports = router;
