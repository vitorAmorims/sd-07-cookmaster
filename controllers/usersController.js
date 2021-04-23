const Users = require('../models/usersModels');

const SUCCESS = 201;
const SYSTEM_FAIL = 500;
const FAIL = 404;

const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const results = await Users.addUser(name, email, password, role);
    res.status(SUCCESS).json(results.ops[0]);
  } catch (err) {
    res.status(SYSTEM_FAIL).json({ message: err.message });
  }
};

module.exports = {
  addUser,
};