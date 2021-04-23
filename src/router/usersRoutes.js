const express = require('express');
// const rescue = require('express-rescue');
const { usersController } = require('../controller');
// const middlewares = require('../middleware');

const router = express.Router();

// const {  } = middlewares;

router.post('/users',
  usersController.createUser);

// router.get('/users', );

// router.get('/users/:id', );

// router.put('/users/:id', );

// router.delete('/users/:id', );

module.exports = router;