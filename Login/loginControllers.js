const loginService = require('./loginServices');
const loginModel = require('./loginModels');
const loginToken = require('./loginToken');

const OK = 200;
const UNAUTHORIZED = 401;

const makeLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validadeLogin = loginService.validateLogin(email, password);
    if (validadeLogin) throw new Error(validadeLogin);

    const user = await loginModel.findUser(email);
    const token = loginToken.createToken(user);
    res.status(OK).json({ token });
  } catch (error) {
    res.status(UNAUTHORIZED).json({ message: error.message });
  }
}; // req. 2

module.exports = {
  makeLogin,
};
