const modelUsers = require('../Model/UserModel');
const serviceUsers = require('../Service/UserService');
const codes = require('./Status');

const objError = {
  err: {
    code: 'invalid_data',
    message: '',
  },
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await serviceUsers.createUser(name, email, password);
    return res.status(codes.CREATE).json({ user: result });
  } catch (error) {
    const { message } = error;
    if (message.includes('registered')) {
      return res.status(codes.CONFLICT).json({ message });
    }
    res.status(codes.ERROR).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const data = await serviceUsers.getAllUsers();
    return res.status(codes.OK).json(data);
  } catch (error) {
    console.error(error);
    return res.status(codes.ERROR).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await serviceUsers.getProductsId(id);
    if (!data) {
      objError.err.message = 'Wrong id format';
      return res.status(codes.UNPROCESS).json(objError);
    }
    return res.status(codes.OK).json(data);
  } catch (error) {
    console.error(error);
    const { message } = error;
    if (message.includes('id')) {
      objError.err.message = error.message;
      return res.status(codes.UNPROCESS).json(objError);
    }
    return res.status(codes.ERROR).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const data = await serviceUsers.updateUser(id, name, quantity);
  return res.status(codes.OK).json(data);
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await modelUsers.getUserById(id);
    const { _id } = user;
    if (!user) throw new Error({ code: 'invalid_data', message: 'Wrong id format' });
    await serviceUsers.deleteUser(_id);
    return res.status(codes.DELETEOK).json(user);
  } catch (error) {
    console.log(error);
    return res.status(codes.UNPROCESS).json({ err: error });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { role } = req.user;
    if (String(role) === 'admin') {
      const data = await serviceUsers.createUserAdmin(name, email, password, role);
    return res.status(codes.CREATE).json({ user: data });
    }
    throw new Error('Only admins can register new admins');
  } catch (error) {
    console.log(error);
    res.status(codes.ERRORADMIN).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addAdmin,
};