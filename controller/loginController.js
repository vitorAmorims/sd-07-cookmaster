// const usersModels = require('../models/usersModels');
const { tokenGeneration } = require('../service/loginService');

const STATUS200 = 200;
// const STATUS201 = 201;
const STATUS500 = 500;

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await tokenGeneration(email);
    res.status(STATUS200).json({ token: result });
  } catch (error) {
    console.log(error);
    res.status(STATUS500).json({ message: error.message });
  }
};

module.exports = {
  login,
};
