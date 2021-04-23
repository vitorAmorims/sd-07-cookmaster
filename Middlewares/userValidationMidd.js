const { searchEmail } = require('../Models/usersModel');
const { formatEmail, userDataNotOk } = require('../Services/userValidations');

const userValidationMidd = async (req, res, next) => {
  const { name, email, password } = req.body;
  const emailOk = formatEmail(email);
  if (userDataNotOk(name, email, password) || !emailOk) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }
  if (await searchEmail(email)) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }
  next();
};

module.exports = { 
  userValidationMidd,
};
