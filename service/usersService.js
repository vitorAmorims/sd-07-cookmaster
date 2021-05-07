const usersModels = require('../models/users');

const create = async (name, email, password, role) => {
    const nameExists = await usersModels.findByName(name);

    if (nameExists) return false;

    const result = await usersModels.create(name, email, password, role);
    return result;
};

module.exports = { 
    create,
};