const { Router } = require('express');
const { body } = require('express-validator');
const { validatorMiddleware, validLoginMiddleware } = require('../Middlewares');

const { createUsers, login } = require('../controllers');

const router = Router();

router.post('/users',
    body('email').isEmail(), 
    body('name').notEmpty(),
    body('password').notEmpty().isLength({ max: 10 }),
    validatorMiddleware,
    createUsers);

router.post('/login',
    body('email').isEmail(), 
    body('password').notEmpty(),
    validLoginMiddleware,
    login);

module.exports = { router };
