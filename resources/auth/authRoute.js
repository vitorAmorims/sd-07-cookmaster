const express = require('express');
const rescue = require('express-rescue');

const router = express.Router();

const { 
  loginUser,
} = require('./authController');

const authValidateMiddleware = require('./authValidateMiddleware');

const BASE_ENDPOINT = '/login';
router.post(BASE_ENDPOINT, authValidateMiddleware, rescue(loginUser));

module.exports = router; 