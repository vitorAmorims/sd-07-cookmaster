const express = require('express');

const router = express.Router();

const { checkLogin } = require('../controllers/login');
  
router.post('/', checkLogin);
  
module.exports = router;
