const userService = require('../services/userService');

const HTTP200 = 200;
const HTTP201 = 201;
const HTTP500 = 500;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await userService.createUser(name, email, password);        
    res.status(HTTP201).json(result);
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await userService.loginUser(email);        
    res.status(HTTP200).json(result);
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};