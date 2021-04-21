const usersServices = require('../services/usersServices');

const createUser = async (req, res) => {
  const user = req.body;
  user.role = 'user';

  try {
    const { status, result } = await usersServices.createUser(user);

    res.status(status).json(result);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

module.exports = {
  createUser,
};
