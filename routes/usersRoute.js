const express = require('express');
const {
  createNewUser,
} = require('../controllers');

const router = express.Router();

router.post('/users', createNewUser);

module.exports = router;