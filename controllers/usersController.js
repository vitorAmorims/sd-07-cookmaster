const usersService = require('../services/usersService');
const { Created, BadRequest, Conflict } = require('../config/statusCode');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await usersService.registerUser(name, email, password);
    const { invalidMessage, emailExists } = user;

    if (invalidMessage) return res.status(BadRequest).json({ message: invalidMessage });
    if (emailExists) return res.status(Conflict).json({ message: emailExists });

    return res.status(Created).json({ user });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  registerUser,
};
