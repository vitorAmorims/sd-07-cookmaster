const express = require('express');
const usersController = require('../controllers/usersController');
const {
  validationName,
  validationPassword,
  validationEmail,
} = require('../middleware/userValidation');

const router = express.Router();

router.post(
  '/users',
  validationName,
  validationPassword,
  validationEmail,
  usersController.createUsers,
);

module.exports = router;
