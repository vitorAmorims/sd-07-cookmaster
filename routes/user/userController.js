const { Router } = require('express');
const userService = require('./userService');
const { CREATED, CONFLICT, OH_NO } = require('../../helpers/status');
const { userMiddleware } = require('../../middlewares');
const { emailExists } = require('../../helpers/errorMessage');

const userRouter = new Router();

userRouter.post('/', userMiddleware, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const createdUser = await userService.createUser(name, email, password);
    if (!createdUser) return res.status(CONFLICT).json(emailExists);
    res.status(CREATED).json({ user: createdUser });
  } catch (err) {
    res.status(OH_NO).json(err);
  }
});

module.exports = userRouter;