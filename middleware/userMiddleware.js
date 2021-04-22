const UserModel = require('../models/userModel');

const verifyUser = (req, resp, next) => {
  const { name, email, password } = req.body;
  const regexEmail = /\S+@\S+\.\S+/; 
  if (!name || !email || !password || !regexEmail.test(email)) {
    return resp.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const verifyEmail = async (req, resp, next) => {
  const { email } = req.body;
  const replyEmail = await UserModel.replyEmail(email);
  console.log(replyEmail);
  if (replyEmail !== null) {
    return resp.status(409).json({ message: 'Email already registered' });
  }
  next();
};

module.exports = {
  verifyUser,
  verifyEmail,
};