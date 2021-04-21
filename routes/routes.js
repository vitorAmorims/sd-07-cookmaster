const express = require('express');
const usersController = require('../controllers/usersController');
const {
  validationUser,
  validationPassword,
} = require('../middleware/userValidation');

const router = express.Router();

router.post(
  '/users',
  validationUser,
  validationPassword,
  usersController.createUsers,
);

module.exports = router;
