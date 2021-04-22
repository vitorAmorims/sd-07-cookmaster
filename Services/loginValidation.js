const { searchEmailAndPass } = require('../Models/loginModel');

// https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const formatEmail = (email) => {
  const emailReg = /\S+@\S+\.\S+/;
  return emailReg.test(email);
};

const dataNotOk = (email, password) => {
  if (!email || !password) return true;
};

const loginValidationMidd = async (req, res, next) => {
  const { email, password } = req.body;
  const emailOk = formatEmail(email);
  if (dataNotOk(email, password)) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  const userData = await searchEmailAndPass(email, password);
  if (!userData) {
    return res.status(401).json({
      message: 'Incorrect username or password',
    });
  }
  if (!emailOk) {
    return res.status(401).json({
      message: 'Incorrect usarname or password',
    });
  }
  next();
};

module.exports = {
  // emailValidation,
  loginValidationMidd,
};
