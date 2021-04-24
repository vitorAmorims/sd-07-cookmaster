const bcrypt = require('bcrypt');

const serviceUsers = require('../services/users');

const OK = 200;
const CREATE = 201;
const ERROR = 400;
const ERRORADMIN = 403;
const CONFLICT = 409;

const postUser = async (request, response) => {
  try {
    const { name, email } = request.body;
    let { password } = request.body;

    const salt = bcrypt.genSaltSync(5);
    password = bcrypt.hashSync(password, salt);
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
  const { role } = request.user;
  try {
    if (String(role) === 'admin') {
      const result = await serviceUsers.getAllUsers();
      return response.status(OK).json(result);
    }
    throw new Error('error when searching the database OR access denied');
  } catch (error) {
    console.log(error);
    response.status(ERROR).json({ message: error.message });
  }
};

const getUserById = async (request, response) => {
  const { id } = request.params;
  const { role, _id } = request.user;
  try {
    if (String(role) === 'admin' || String(_id) === id) {
      const result = await serviceUsers.getUserById(id);
      return response.status(OK).json({ user: result });
    }
    throw new Error('error when searching for user in bd');
  } catch (error) {
    console.log(error);
    response.status(ERROR).json({ message: error.message });
  }
};

const putUser = async (request, response) => {
  const { id } = request.params;
  const { name, email, password } = request.body;
  const { role, _id } = request.user;
  try {
    if (String(role) === 'admin' || String(_id) === id) {
      const objParams = { id, name, email, password, role };
      const data = await serviceUsers.updateUser(objParams);
      return response.status(CREATE).json({ user: data });
    }
    throw new Error('Error when performing update');
  } catch (error) {
    console.log(error);
    response.status(ERRORADMIN).json({ message: error.message });
  }
};

const deleteUser = async (request, response) => {
  const responseOK = 204;
  const responseError = 422;
  const { id } = request.params;
  const { role, _id } = request.user;

  try {
    if (String(role) === 'admin' || String(_id) === id) {
      await serviceUsers.deleteUser(id);
      return response.status(responseOK).send();
    }
    throw new Error('error when deleting user registration');
  } catch (error) {
    console.log(error);
    response.status(responseError).json({ message: error.message });
  }
};

const addAdmin = async (request, response) => {
  try {
    const { name, email } = request.body;
    let { password } = request.body;
    const salt = bcrypt.genSaltSync(5);
    password = bcrypt.hashSync(password, salt);

    const { role } = request.user;
    if (String(role) === 'admin') {
      const data = await serviceUsers.createUserAdmin(name, email, password, role);
    return response.status(CREATE).json({ user: data });
    }
    throw new Error('Only admins can register new admins');
  } catch (error) {
    console.log(error);
    response.status(ERRORADMIN).json({ message: error.message });
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
