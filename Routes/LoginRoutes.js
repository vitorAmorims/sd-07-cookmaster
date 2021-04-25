const express = require('express');

const router = express.Router();

const { checkedLogin } = require('../Controller/LoginController');

  router.post('/', checkedLogin);
  
  module.exports = router;