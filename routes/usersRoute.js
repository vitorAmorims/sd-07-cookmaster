const express = require('express');
const {
  createNewUser,
} = require('../controllers');

const router = express.Router();

router.post('/users', createNewUser);
// router.post('/users/admin', createNewAdmin);

module.exports = router;