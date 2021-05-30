const serviceLogin = require('../services/serviceLogin');

const OK = 200;
const UNAUTHORIZED = 401;

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const result = await serviceLogin.userLogin(email, password);

  if (result === 'All fields must be filled' || result === 'Incorrect username or password') {
    res.status(UNAUTHORIZED).json({ message: result });
  } else {
    res.status(OK).json({ token: result });
  }
};

module.exports = { userLogin };
