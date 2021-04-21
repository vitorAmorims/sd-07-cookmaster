const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const { 
  createUser,
  createAdmin,
} = require('./userController');

const userValidateMiddleware = require('./userValidateMiddleware');
const { validateTokenMiddleware } = require('../../middlewares');

const BASE_ENDPOINT = '/users';
router.post(BASE_ENDPOINT, userValidateMiddleware, rescue(createUser));
router.post(`${BASE_ENDPOINT}/admin`, 
  [validateTokenMiddleware, userValidateMiddleware],
   rescue(createAdmin));

module.exports = router; 
