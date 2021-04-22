const express = require('express');
const validateToken = require('../middlewares/errorMessagesAndCodes');
const user = require('../controller/user');

const router = express.Router();

router.route('/users')
  .post(user.create);

router.route('/users/admin')
  .post(validateToken, user.createAdmin);

module.exports = router;
