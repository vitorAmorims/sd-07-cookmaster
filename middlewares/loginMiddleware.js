const usersService = require('../service/usersService');

const unauthorized = 401;

const loginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  const emailValid = await usersService.findEmail(email);
  if (!password || !email) {
    return res.status(unauthorized).send({
      message: 'All fields must be filled',
    });
  }
  if (!emailValid) {
    return res.status(unauthorized).send({
      message: 'Incorrect username or password',
    });
  }
 
  next();
};

module.exports = loginMiddleware;
