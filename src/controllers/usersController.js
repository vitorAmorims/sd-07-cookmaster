const jwt = require('jsonwebtoken');
const usersService = require('../services/usersService');

const OK = 200;
const CREATED = 201;
const INTERNAL_SERVER_ERROR = 500;
const secret = 'abc';

const createUser = async (req, res) => {
  try {
    const { name: newName, email: newEmail, password } = req.body;

    const result = await usersService.createUser(newName, newEmail, password);
    
    if (result.code) {
      return res.status(result.code).json({ message: result.message });
    }
    const { name, email, role, _id } = result;
    const response = { user: { name, email, role, _id } };
    return res.status(CREATED).json(response);
  } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email: currEmail, password } = req.body;
    const result = await usersService.login(currEmail, password);

    if (result.code) {
      return res.status(result.code).json({ message: result.message });
    }
    const { _id, email, role } = result;
    const jwtConfig = { expiresIn: 60 * 60, algorithm: 'HS256' };
    const tokenData = jwt.sign({ data: { _id, email, role } }, secret, jwtConfig);
    return res.status(OK).json({ token: tokenData });
    } catch (error) {
    console.error(error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  login,
};