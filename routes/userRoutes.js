const express = require('express');
const userController = require('../controllers/userController');
const middlewares = require('../middlewares');

const router = express.Router();
router.post(
  '/users',
  middlewares.validateEntriesMiddleware,
  middlewares.validateEmailMiddleware, 
  userController.createUser,
);

router.post(
  '/login',
  middlewares.validateLoginMiddleware,
  userController.loginUser,
);

module.exports = router;