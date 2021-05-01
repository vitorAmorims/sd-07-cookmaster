const express = require('express');
const service = require('../services/userService');

const router = express.Router();
const validateUserMiddleware = require('../middlewares/userMiddleware');
const userSchema = require('../schemas/userSchema');

router.post('/users', userSchema, validateUserMiddleware, 
  async (request, response) => {
    const { name, email, password } = request.body;
    
    const user = {
      name,
      email,
      password,
    };

    response.status(201).json(await service.createUser(user));
  });

module.exports = router;