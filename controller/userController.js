const bcrypt = require('bcrypt');
const User = require('../model/UserModel');

const SUCCESS = 200;
const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;

const createUserController = async (req, res) => {
    try {
        const { name, email } = req.body;
        let { password } = req.body;

        const salt = bcrypt.genSaltSync(5);
        password = bcrypt.hashSync(password, salt);

        const newUser = await User.registerUser(name, email, password);
        if (!newUser) throw Error;

        res.status(CREATED).json({ user: newUser });
    } catch (error) {
        res.status(INTERNAL_SERVER_ERROR).json({
            message: 'Error trying to save user.',
            error: error.message,
        });
    }
};

const loginUserController = async (req, res) => {
  try {
    const { token } = req.body;
    res.status(SUCCESS).json({ token });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error.',
      error: error.message,
    });
  }
};

module.exports = {
    createUserController,
    loginUserController,
};
