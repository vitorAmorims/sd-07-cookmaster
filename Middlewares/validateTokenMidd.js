const jwt = require('jsonwebtoken');
const userModel = require('../Models/usersModel');

const missingToken = { message: 'missing auth token' };
const senha = 'swordfish';

const validateTokenMidd = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) throw missingToken;
    try {
      const decript = jwt.verify(token, senha);
      const userData = await userModel.searchEmail(decript.email);
      req.user = userData;
      next();
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
};

module.exports = validateTokenMidd;