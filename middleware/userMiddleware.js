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
  if (replyEmail !== null) {
    return resp.status(409).json({ message: 'Email already registered' });
  }
  next();
};

const verifyLogin = async (req, resp, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return resp.status(401).json({ message: 'All fields must be filled' });
  }
  next();
}; 

module.exports = {
  verifyUser,
  verifyEmail,
  verifyLogin,
};