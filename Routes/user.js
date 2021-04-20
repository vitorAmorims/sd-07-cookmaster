const express = require('express');
const user = require('../Controller/user');

const router = express.Router();

router.route('/users')
  .post(user.create);

  module.exports = router;