const express = require('express');
const { addUser } = require('../controllers/usersController');
const {
  checkUserData,
  checkedEmailExists } = require('../middleware');

const router = express.Router();

router.post('/users', [checkUserData, checkedEmailExists], addUser);

module.exports = router;