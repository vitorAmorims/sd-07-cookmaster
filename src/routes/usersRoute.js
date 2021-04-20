const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router
  .route('/users')
  .post(usersController.createUser);

module.exports = router;