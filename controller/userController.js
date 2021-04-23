// const bcrypt = require('bcrypt');
const User = require('../model/UserModel');

const SUCCESS = 200;
const CREATED = 201;

const createUserController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // let { password } = req.body;

        // const salt = bcrypt.genSaltSync(5);
        // password = bcrypt.hashSync(password, salt);

        const newUser = await User.registerUser(name, email, password);
        if (!newUser) throw Error;

        res.status(CREATED).json({ user: newUser });
    } catch (err) {
      next(err);
    }
};

const loginUserController = async (req, res, next) => {
  try {
    const { token } = req.body;
    res.status(SUCCESS).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
    createUserController,
    loginUserController,
};
