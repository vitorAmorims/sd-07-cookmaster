const jwt = require('jsonwebtoken');
const authConfig = require('../Config/auth.json');
const serviceLogin = require('../Service/LoginService');
const codes = require('./Status');

function generatedToken(email, result, jwtConfig) {
  const { _id, email: emailToken, role } = result;
  const token = jwt.sign({ id: _id, emailToken, role }, authConfig.secret, jwtConfig);
  return token;
}

const checkedLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await serviceLogin.validations(email, password);

    if (result) {
      const jwtConfig = {
        expiresIn: 60 * 60,
        algorithm: 'HS256',
      };
      const token = generatedToken(email, result, jwtConfig);
      return res.status(codes.OK).json({ token });
    }
  } catch (error) {
    console.error(error);
    const { message } = error;
    return res.status(codes.ERRORUPDATE).json({ message });
  }
};

module.exports = {
  checkedLogin,
};