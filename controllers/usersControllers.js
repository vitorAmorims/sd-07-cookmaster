const userService = require('../services/userService');
const errors = require('../errors');

async function addNewUser(req, res) {
  const responseOK = 201;
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) throw errors.invalidEntries;
    const newUser = await userService.registerUser(name, email, password);
    res.status(responseOK).json({ user: newUser });
  } catch (err) {
    res.status(err.code).json({
      message: err.message,
    });
  }
}

module.exports = {
  addNewUser,
};