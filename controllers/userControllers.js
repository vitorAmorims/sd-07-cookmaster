const userService = require('../services/userServices');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const register = await userService.registerUser(name, email, password);
    const { role, _id } = register;
    // console.log(register);
    if (register.erro) {
      return res.status(register.erro.status).json({ message: register.erro.message });
    }
    return res.status(201).json({ user: { name, email, role, _id } });
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
};

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();

  res.status(201).json({ user: users });
};

module.exports = {
  registerUser,
  getAllUsers,
};

// const Joi = require('joi');

// const validateRegister = (body) = {
//   Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().required(),
//     password: Joi.string().required(),
//   })
// }