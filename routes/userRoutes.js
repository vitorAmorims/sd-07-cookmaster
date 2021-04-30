const { Router } = require('express');
const { body } = require('express-validator');
const { validatorMiddleware, validLoginMiddleware } = require('../Middlewares');

const { createUsers, login } = require('../controllers');

const routerUser = Router();

routerUser.post('/users',
    body('email').isEmail(), 
    body('name').notEmpty(),
    body('password').notEmpty().isLength({ max: 10 }),
    validatorMiddleware,
    createUsers);

routerUser.post('/login',
    body('email').isEmail(), 
    body('password').notEmpty(),
    validLoginMiddleware,
    login);

routerUser.post('/users/admin', validLoginMiddleware, createUsers);

module.exports = { routerUser };
