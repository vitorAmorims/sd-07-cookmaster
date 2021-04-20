const jwt = require('../../jwt');
const model = require('../../models/users');
// const bcrypt = require('bcrypt-nodejs');

const create = async (name, email, password) => {
    const role = 'user';
    const data = await model.create(name, email, password, role);
    return data;
};

const log = async (email, password) => {
    const data = await model.log(email, password);
    if (data) {
        return jwt.sign({ data });
    }
    return false;
};

module.exports = {
    create,
    log,
};