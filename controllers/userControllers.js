const userModel = require('../models/userModel');

const BADREQUEST = 400;
const CREATED = 201;

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await userModel.register(name, email, password);
    res.status(CREATED).send({
      user: newUser,
    });
    } catch (err) {
      console.error(err.message);
      res.status(BADREQUEST).json({ message: err.message });
    }
};

module.exports = {
  registerUser,
};