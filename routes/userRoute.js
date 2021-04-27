const express = require('express');
const UserController = require('../controllers/userController');
const { 
  verifyUser,
  verifyEmail,
  verifyLogin,
} = require('../middleware/userMiddleware');

const router = express.Router();

router.get('/users', UserController.getAll);
router.post('/users', verifyUser, verifyEmail, UserController.addUser);
router.post('/login', verifyLogin);

module.exports = router;