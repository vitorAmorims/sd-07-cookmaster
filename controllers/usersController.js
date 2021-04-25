const usersService = require('../services/usersService');
const usersModel = require('../models/usersModel');
const { Created, BadRequest, Conflict, Forbidden } = require('../config/statusCode');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await usersService.registerUser(name, email, password);
    const { invalidMessage, emailExists } = newUser;

    if (invalidMessage) return res.status(BadRequest).json({ message: invalidMessage });
    if (emailExists) return res.status(Conflict).json({ message: emailExists });

    return res.status(Created).json({ user: newUser });
  } catch (err) {
    throw new Error(err);
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== 'admin') {
      return res.status(Forbidden)
        .json({ message: 'Only admins can register new admins' });
    }
    
    const { name, email, password } = req.body;
    const newAdmin = await usersModel.registerAdmin(name, email, password);

    return res.status(Created).json({ user: newAdmin });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  registerUser,
  registerAdmin,
};
