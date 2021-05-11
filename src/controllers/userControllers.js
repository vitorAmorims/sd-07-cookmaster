const service = require('../services/userServices');

const newUser = async (req, res, next) => {
  try {
    const newRegister = await service.newUser(req.body);
    return res.status(201).json({ user: newRegister });
  } catch (e) {
    req.error = e;
    next();
  }
};

const newAdmin = async (req, res) => {
  const token = req.headers.authorization;
  try {
    const newRegister = await service.newAdmin(req.body, token);
    return res.status(201).json({ user: newRegister });
  } catch (e) {
    if (e.message === 'Only admins can register new admins') {
      return res.status(403).json({ message: e.message });
    }
  }
};

const getUserByEmail = async (req, res, next) => {
  try {
    const userToken = await service.getUserByEmail(req.body);
    return res.status(200).json(userToken);
  } catch (e) {
    req.error = e;
    next();
  }
};

module.exports = {
  newUser,
  newAdmin,
  getUserByEmail,
};
