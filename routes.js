const express = require('express');

const route = express.Router();

const { upload } = require('./config/multerConfig');

const {
    validateCreateUserMiddleware,
    validateUniqueUserMiddleware,
    validateLoginUserMiddleware,
    validatePasswordMiddleware,
    validateLoggedUserMiddleware,
} = require('./middleware/userMiddlewares');

const {
    validateTokenMiddleware,
    validateCreateRecipeMiddleware,
} = require('./middleware/recipeMiddlewares');

const {
    createUserController,
    loginUserController,
} = require('./controller/userController');

const {
    createRecipeController,
    getAllRecipesController,
    getRecipeByIdController,
    updateRecipeController,
    deleteRecipeController,
    uploadRecipeImageController,
} = require('./controller/recipeController');

route.use(express.static(`${__dirname}uploads/`));

route.post(
    '/users',
    validateCreateUserMiddleware,
    validateUniqueUserMiddleware,
    createUserController,
);

route.post(
    '/login',
    validateLoginUserMiddleware,
    validatePasswordMiddleware,
    loginUserController,
);

route.post(
    '/recipes',
    validateCreateRecipeMiddleware,
    validateTokenMiddleware,
    createRecipeController,
);
const RECIPES_ID = '/recipes/:id';
route.get('/recipes', getAllRecipesController);
route.get(RECIPES_ID, getRecipeByIdController);

route.put(
    RECIPES_ID,
    validateTokenMiddleware,
    validateLoggedUserMiddleware,
    updateRecipeController,
    );

route.delete(
    RECIPES_ID,
    validateTokenMiddleware,
    validateLoggedUserMiddleware,
    deleteRecipeController,
    );

route.put(
    '/recipes/:id/image',
    validateTokenMiddleware,
    validateLoggedUserMiddleware,
    upload.single('image'),
    uploadRecipeImageController,
    );

module.exports = route;
