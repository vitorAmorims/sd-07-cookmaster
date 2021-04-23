const { usersService } = require('../services');

const {
  validateCreateUser,
  validateReadAllUsers,
  validateCreateLoginToken,
  validateReadById,
} = usersService;

const {
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  OK,
  UNAUTHORIZED,
} = require('../status');

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await validateCreateUser(name, email, password);
    if (result.status)
      return next({ status: result.status, message: result.message });
    res.status(CREATED).json({ user: result });
  } catch (error) {
    console.error(error);
    next({
      status: BAD_REQUEST,
      message: error.message,
    });
  }
};

const createLoginToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    const token = await validateCreateLoginToken(email);
    res.status(OK).json({ token });
  } catch (error) {
    console.error(error);
    next({
      status: UNAUTHORIZED,
      message: error.message,
    });
  }
};

const readAllUsers = async (_req, res, next) => {
  try {
    const result = await validateReadAllUsers();
    res.status(OK).json(result);
  } catch (error) {
    console.error(error);
    next({
      status: NOT_FOUND,
      message: error.message,
    });
  }
};

const readUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await validateReadById(id);
    if (result.status)
      return next({ status: result.status, message: result.message });
    res.status(OK).json(result);
  } catch (error) {
    console.error(error);
    next({
      status: BAD_REQUEST,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  readAllUsers,
  createLoginToken,
  readUserById,
};
