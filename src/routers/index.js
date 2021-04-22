const express = require('express');
const { login, users } = require('../controllers');
const {
  checkUserData,
  checkedEmailExists,
  checkLoginDataExistsMD } = require('../middleware');

const router = express.Router();

router.post('/users', [checkUserData, checkedEmailExists], users);
router.post('/login', [checkLoginDataExistsMD], login);

module.exports = router;