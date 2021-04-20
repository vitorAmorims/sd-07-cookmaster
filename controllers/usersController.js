const usersService = require('../service/usersService');

const STATUS_CREATED = 201;
// const STATUS_OK = 200;
// const STATUS_UNPROCESSABLE = 422;

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await usersService.createUser(name, email, password);

    return res.status(STATUS_CREATED).json({ user: user.ops[0] });
  } catch (error) {
    console.error({ message: 'Não entrou no controller' });
  }
};

module.exports = {
  createUser,
};
