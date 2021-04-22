const express = require('express');
const UserController = require('../controllers/userController');
const { 
  verifyUser,
  verifyEmail, 
} = require('../middleware/userMiddleware');

const router = express.Router();

router.get('/users', UserController.getAll);
router.post('/users', verifyUser, verifyEmail, UserController.addUser);

module.exports = router;