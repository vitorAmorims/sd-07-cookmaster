const UserModel = require('../models/usersModel');
const status = require('../utils/status');

const addUser = async (req, res) => {
    const { name, email, password } = req.body;
    const role = 'user';
    const newUser = await UserModel.addUser(name, email, password, role);
    return res.status(status.created).json({ user: newUser });
};

const addAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    const role = 'admin';
    const newAdm = await UserModel.addAdmin(name, email, password, role);
    return res.status(status.created).json({ user: newAdm });
};

module.exports = { addUser, addAdmin };
