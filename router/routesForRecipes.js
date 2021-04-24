const { Router } = require('express');
const { body } = require('express-validator');
const controllerForRecipe = require('../controller/controllerForRecipe');
const tokenValidator = require('../auth/jwtValidator');

const route = Router();

route.post('/', tokenValidator, 
                body('name').notEmpty(),
                body('ingredients').notEmpty(),
                body('preparation').notEmpty(), 
                controllerForRecipe.create);

module.exports = route;