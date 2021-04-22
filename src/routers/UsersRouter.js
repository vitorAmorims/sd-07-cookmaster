const express = require('express');
const { addUser, login } = require('../controllers/usersController');
const {
  checkUserData,
  checkedEmailExists,
  checkLoginDataExistsMD } = require('../middleware');

const router = express.Router();

router.post('/users', [checkUserData, checkedEmailExists], addUser);
router.post('/login', [checkLoginDataExistsMD], login);

module.exports = router;