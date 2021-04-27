const express = require('express');
const {
  getAll,
  addUser, 
  loginUser,
 } = require('../controllers/userController');
const { 
  verifyUser,
  verifyEmail,
  verifyLogin,
} = require('../middleware/userMiddleware');

const router = express.Router();

router.get('/users', getAll);
router.post('/users', verifyUser, verifyEmail, addUser);
router.post('/login', verifyLogin, loginUser);

module.exports = router;