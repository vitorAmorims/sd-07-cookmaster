const { Router } = require('express');
const { body } = require('express-validator');
const controllerforUsers = require('../controller/controllerForUser');
const middleware = require('../middleware');

const route = Router();

route.get('/', middleware.errorMiddleware, controllerforUsers.getAll);

route.post('/', middleware.errorMiddleware,
                body('name').notEmpty(),
                body('email').isEmail(),
                body('password').isLength({ min: 5 }), 
                controllerforUsers.create);

route.post('/admin', middleware.errorMiddleware,
                middleware.authentication,
                middleware.adminGetRole,
                body('name').notEmpty(),
                body('email').isEmail(),
                body('password').isLength({ min: 5 }), 
                controllerforUsers.create);

module.exports = route;