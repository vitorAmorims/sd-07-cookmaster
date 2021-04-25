const express = require('express');
const { createUserController } = require('../controllers/users');

const router = express.Router();

router.route('/users')
  .post(createUserController);

module.exports = router;