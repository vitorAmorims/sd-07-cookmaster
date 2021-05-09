const modelUsers = require('../services/ServicesUser');
const { status } = require('../helpers');

const addNewUser = async (req, res, next) => {
  const { body } = req;
  try {
    const newUser = await modelUsers.create(body);
    return res.status(status.created.code).json(newUser);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await modelUsers.read(email);
    return res.status(status.ok).json({ user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addNewUser,
  getUser,
};