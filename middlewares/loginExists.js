const { findEmail } = require('../models/userModel');
const { findPassword } = require('../models/userModel');

const unauthorized = 401;

const loginExists = async (req, res, next) => {
  const { email, password } = req.body;
  const findedEmail = await findEmail(email);
  const findedPassword = await findPassword(password);
  // console.log(`loginExists variavel findedEmail, findedPassword: ${findedEmail} , ${findedPassword} `);
  if (findedEmail == null || findedPassword == null) {
    return res.status(unauthorized).json({
      message: 'Incorrect username or password',
    });
  }
  next();
};

module.exports = loginExists;
