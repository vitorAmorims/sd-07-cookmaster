const express = require('express');
const userController = require('../controllers/userController');
const { validateUser, validateLogin } = require('../middlewares');

const router = express.Router();

router.post('/users', validateUser, userController.createUser);
router.post('/login', validateLogin, userController.loginUser);
// router.get('/user/:id', userController);
// router.put('/user/:id', userController);
// router.delete('/user/:id', userController);

module.exports = router;