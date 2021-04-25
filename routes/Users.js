const express = require('express');
const {
  validateObligatoryFields,
  validateUniqueEmail,
} = require('../middlewares');
const UsersControllers = require('../controllers/UsersControllers');

const router = express.Router();

router.post(
  '/users',
  validateObligatoryFields,
  validateUniqueEmail,
  UsersControllers.addUser,
);

module.exports = router;
