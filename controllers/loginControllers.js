const jwt = require('jsonwebtoken');
const loginModel = require('../models/loginModel');

const secret = 'senhasupersecreta';

const BADREQUEST = 400;
const UNAUTHORIZED = 401;
const INCORRECTINFORMATION = 'Incorrect username or password';
const OK = 200;

const effectLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginModel.findUser(email);
    if (!user || user.password !== password) {
 return res
        .status(UNAUTHORIZED)
        .json({ message: INCORRECTINFORMATION }); 
}
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: user }, secret, jwtConfig);
    return res.status(OK).json({ token });
    } catch (err) {
      console.error(err.message);
      res.status(BADREQUEST).json({ message: err.message });
    }
};

module.exports = {
  effectLogin,
};