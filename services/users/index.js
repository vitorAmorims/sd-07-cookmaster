const model = require('../../models/users');
// const bcrypt = require('bcrypt-nodejs');

const create = async (name, email, password) => {
    const role = 'user';
    const data = await model.create(name, email, password, role);
    return data;
};

module.exports = {
    create,
};