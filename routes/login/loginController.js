const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED, OK } = require('../../helpers/status');
const userModel = require('../user/userModel');
const { loginMiddleware } = require('../../middlewares');

const loginRouter = new Router();

loginRouter.post('/', loginMiddleware, async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.getByEmail(email);
  const secret = 'manodoceumeajuda';
  if (!user || user.password !== password) {
    return res.status(UNAUTHORIZED).json({
      message: 'Incorrect username or password',
    });
  }
  const jwtConfig = {
    expiresIn: '20m',
    algorithm: 'HS256',
  };

  const { _id: id } = user;
  const payload = { id, email, role: user.role };

  const token = jwt.sign(payload, secret, jwtConfig);
  return res.status(OK).json({ token });
});

module.exports = loginRouter;