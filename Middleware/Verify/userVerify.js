const userModel = require('../../models/userModel');

const userLogin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(401).json({});
  const user = await userModel.findUser(username);
  if (!user) return res.status(400).json({ message: 'Invalid entries. Try again.' });
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
  console.log('is valid');
  next();
};

module.exports = {
  userLogin,
  userCreate,
};