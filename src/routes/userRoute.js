const express = require('express');
const { userController } = require('../controller');
const { validationMiddleware } = require('../middlewares');

const router = express.Router();

router.use(express.json());

const BASE_URL = '/users';

router.post(BASE_URL, 
            validationMiddleware.validation,
            validationMiddleware.userExists, 
            userController.createUser);

router.post(`${BASE_URL}/admin`, userController.createAdmin);

module.exports = router;