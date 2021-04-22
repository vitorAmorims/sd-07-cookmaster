const express = require('express');
const rescue = require('express-rescue');
const UserController = require('../controllers/UserController');
const { entriesValidate, isSigned } = require('../middlewares');

const router = express.Router();

router.post('/users', entriesValidate, isSigned, rescue(UserController.create));

module.exports = router;