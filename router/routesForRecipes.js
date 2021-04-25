const { Router } = require('express');
const { body } = require('express-validator');
const controllerForRecipe = require('../controller/controllerForRecipe');
const tokenValidator = require('../auth/jwtValidator');
const fieldValidator = require('../middleware/fieldValidator');

const route = Router();

route.get('/', controllerForRecipe.getAll);

route.get('/:id', controllerForRecipe.getById);

route.put('/:id', tokenValidator, controllerForRecipe.update);

route.post('/',
                body('name').notEmpty(),
                body('ingredients').notEmpty(),
                body('preparation').notEmpty(), 
                fieldValidator,
                tokenValidator,
                controllerForRecipe.create);

module.exports = route;