const { searchEmailAndPass } = require('../Models/loginModel');
const { formatEmail, dataNotOk } = require('../Services/loginValidation');

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
  loginValidationMidd,
};
