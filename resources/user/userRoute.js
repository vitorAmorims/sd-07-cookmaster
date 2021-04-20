const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const { 
  createUser,
} = require('./userController');

const userValidateMiddleware = require('./userValidateMiddleware');

const BASE_ENDPOINT = '/users';
router.post(BASE_ENDPOINT, userValidateMiddleware, rescue(createUser));
// router.get(BASE_ENDPOINT);
// router.get(BASE_ENDPOINT);
// router.put(BASE_ENDPOINT);
// router.delete(BASE_ENDPOINT);

module.exports = router; 