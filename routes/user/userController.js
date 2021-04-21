const { Router } = require('express');
const userService = require('./userService');
const { CREATED, CONFLICT } = require('../../helpers/status');
const { userMiddleware } = require('../../middlewares');

const userRouter = new Router();

userRouter.post('/', userMiddleware, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createdUser = await userService.createUser(name, email, password);
    res.status(CREATED).json({ user: createdUser });
  } catch (err) {
    res.status(CONFLICT).json({ message: err.message });
  }
});

module.exports = userRouter;