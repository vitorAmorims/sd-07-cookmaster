const userService = require('../services/userServices');

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const register = await userService.registerUser(name, email, password);
    if (register) {
      return res.status(register.erro.status).json({ message: register.erro.message });
    }
    return res.status(register.status).json(register.erro);
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err.message);
  }
};

module.exports = {
  registerUser,
};

// const Joi = require('joi');

// const validateRegister = (body) = {
//   Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().required(),
//     password: Joi.string().required(),
//   })
// }