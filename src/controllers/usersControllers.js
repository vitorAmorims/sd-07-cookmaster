const { createNewUser } = require('../services/usersServices');

const ERROR = 500;

const newUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { http, message } = await createNewUser(name, email, password);
    return res.status(http).json(message);
  } catch (error) {
    return res.status(ERROR).send({ message: error });
  }
};

module.exports = { newUser };
