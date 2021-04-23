const usersService = require('../service/usersService');

const { C_200, C_400, C_409, C_500 } = usersService.statusHttp;

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await usersService.create(name, email, password);
    if (user.code400) {
      return res.status(C_400).send({ message: user.message });
    }
    if (user.code409) {
      return res.status(C_409).send({ message: user.message });
    }
    return res.status(C_200).send({ user });
  } catch (error) {
    console.error(error);
      return res
        .status(C_500)
        .json({ message: error.message });
  }
};

module.exports = {
  createUser,
};