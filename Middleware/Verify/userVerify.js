const userModel = require('../../models/userModel');

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(401).json({ message: 'All fields must be filled' });
  const user = await userModel.findUserByEmail(email);
  if (!user) return res.status(401).json({ message: 'Incorrect username or password' });
  next();
};

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

const userCreate = async (req, res, next) => {
  const { name, password, email } = req.body;
  if (!name || !password || !validateEmail(email)) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  const gotEmail = await userModel.findUserByEmail(email);
  if (gotEmail) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  next();
};

module.exports = {
  userLogin,
  userCreate,
};