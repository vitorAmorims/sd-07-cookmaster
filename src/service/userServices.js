const userModel = require('../models/userModel');

const createUser = (name, quantity) => userModel.createUser(name, quantity);

module.exports = { createUser };
