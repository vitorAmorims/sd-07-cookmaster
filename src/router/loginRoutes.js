const express = require('express');
const { loginController } = require('../controller');
// const middlewares = require('../middleware');

const router = express.Router();

// const {  } = middlewares;

router.post('/login',
  loginController.registerUser);

// router.get('/login', );

// router.get('/login/:id', );

// router.put('/login/:id', );

// router.delete('/login/:id', );

module.exports = router;