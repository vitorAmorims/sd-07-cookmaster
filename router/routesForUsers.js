const { Router } = require('express');
const { body } = require('express-validator');
const controllerforUsers = require('../controller/controllerForUser');

const route = Router();

route.get('/', controllerforUsers.getAll);
route.get('/', controllerforUsers.getUseEmail);

route.post('/',
                body('name').notEmpty(),
                body('email').isEmail(),
                body('password').isLength({ min: 5 }), 
                controllerforUsers.create);

module.exports = route;