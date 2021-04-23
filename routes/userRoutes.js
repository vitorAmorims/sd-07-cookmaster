const express = require('express');
const { createAdmin, createUser } = require('../controllers/userController');
const validateToken = require('../middlewares/validateToken');
const validateRegisterUser = require('../middlewares/validateRegisterUser');
const validateAdmin = require('../middlewares/validateAdmin');

const router = express.Router();

router.post('/users/admin',
  validateToken,
  validateAdmin,
  validateRegisterUser,
  createAdmin);

router.post('/users', validateRegisterUser, createUser);

module.exports = router;
