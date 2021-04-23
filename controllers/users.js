const modelUsers = require('../models/users');

const serviceUsers = require('../services/users');

const OK = 200;
const CREATE = 201;
const UNPROCESS = 422;
const ERROR = 400;
const CONFLICT = 409;
const objError = {
  err: {
    code: 'invalid_data',
    message: '',
  },
};

const postUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const result = await serviceUsers.createUser(name, email, password);

    return response.status(CREATE).json({ user: result });
  } catch (error) {
    console.error(error);

    const { message } = error;
    if (message.includes('registered')) {
      return response.status(CONFLICT).json({ message });
    }
    response.status(ERROR).json({ message: error.message });
  }
};

const getAllUsers = async (request, response) => {
  try {
    const data = await serviceUsers.getAllUsers();
    return response.status(OK).json(data);
  } catch (error) {
    console.error(error);
    return response.status(ERROR).json({ message: error.message });
  }
};

const getUserById = async (request, response) => {
  try {
    const { id } = request.params;
    const data = await serviceUsers.getProductsId(id);
    if (!data) {
      objError.err.message = 'Wrong id format';
      return response.status(UNPROCESS).json(objError);
    }
    return response.status(OK).json(data);
  } catch (error) {
    console.error(error);
    const { message } = error;
    if (message.includes('id')) {
      objError.err.message = error.message;
      return response.status(UNPROCESS).json(objError);
    }
    return response.status(ERROR).json({ message: error.message });
  }
};

const putUser = async (request, response) => {
  const { id } = request.params;
  const { name, quantity } = request.body;
  const data = await serviceUsers.updateUser(id, name, quantity);
  return response.status(OK).json(data);
};

const deleteUser = async (request, response) => {
  const responseOK = 204;
  const responseError = 422;
  try {
    const { id } = request.params;
    const user = await modelUsers.getById(id);
    const { _id } = user;
    if (!user) throw new Error({ code: 'invalid_data', message: 'Wrong id format' });

    await serviceUsers.deleteUser(_id);

    return response.status(responseOK).json(user);
  } catch (error) {
    console.log(error);
    return response.status(responseError).json({ err: error });
  }
};

const addAdmin = async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const { role } = request.user;
    if (String(role) === 'admin') {
      const data = await serviceUsers.createUserAdmin(name, email, password, role);
    return response.status(CREATE).json({ user: data });
    }
  } catch (error) {
    console.log(error);
    response.status(ERROR).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
  addAdmin,
};
