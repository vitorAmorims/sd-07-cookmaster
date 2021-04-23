const { findEmail } = require('../models/userModel');

const conflict = 409;

const existingEmail = async (req, res, next) => {
  const { email } = req.body;
  const findedEmail = await findEmail(email);
  console.log(`existingEmail variavel findedEmail: ${findedEmail} `);
  if (findedEmail !== null) {
    return res.status(conflict).json({
      message: 'Email already registered',
    });
  }
  next();
};

module.exports = existingEmail;
