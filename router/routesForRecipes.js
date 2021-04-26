const { Router } = require('express');
const { body } = require('express-validator');
const controllerForRecipe = require('../controller/controllerForRecipe');
const tokenValidator = require('../auth/jwtValidator');
const middleware = require('../middleware');

const route = Router();

route.get('/', middleware.errorMiddleware, controllerForRecipe.getAll);

route.get('/:id', middleware.errorMiddleware, controllerForRecipe.getById);

route.put('/:id', middleware.authentication, controllerForRecipe.update);

route.delete('/:id', middleware.tokenMissing, middleware.getRole, controllerForRecipe.exclude);

route.post('/', middleware.errorMiddleware,
                body('name').notEmpty(),
                body('ingredients').notEmpty(),
                body('preparation').notEmpty(), 
                middleware.fieldValidator,
                tokenValidator,
                controllerForRecipe.create);

module.exports = route;