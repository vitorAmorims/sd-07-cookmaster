const express = require('express');
const multer = require('multer');
const path = require('path');

const RecipeController = require('../controllers/RecipeController');
const middleware = require('../middlewares');
const jwtValidation = require('../auth/jwtValidation');
const authenticationJwt = require('../auth/authenticationJwt');

const router = express.Router();

const storage = middleware.storageMiddleware;
const fileFilter = middleware.fileFilterMiddleware;
const upload = multer({ fileFilter, storage });

const recipeId = '/recipes/:id';

router.post('/recipes', jwtValidation, middleware.recipeMiddleware,
RecipeController.create);

router.put('/recipes/:id/image', middleware.idExistMiddleware,
jwtValidation, authenticationJwt, upload.single('image'), RecipeController.createImage);

router.get('/recipes', RecipeController.findAll);

router.use('/images', express.static(path.resolve(`${__dirname}/../../uploads/`)));

router.get(recipeId, middleware.idExistMiddleware, RecipeController.findById);

router.put(recipeId, middleware.idExistMiddleware,
jwtValidation, authenticationJwt, RecipeController.update);

router.delete(recipeId, middleware.idExistMiddleware,
jwtValidation, authenticationJwt, RecipeController.exclude);

router.use(middleware.errorMiddleware);

module.exports = router;
