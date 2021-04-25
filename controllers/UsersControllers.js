const { addUser: modelAddUser } = require('../models/UsersModels');
const { CREATED } = require('../config/httpCodes');

const role = 'user';

const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await modelAddUser(name, email, role);
    return res.status(CREATED).json(result);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  addUser,
};
