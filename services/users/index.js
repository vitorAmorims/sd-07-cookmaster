const jwt = require('jsonwebtoken');
const model = require('../../models/users');
// const bcrypt = require('bcrypt-nodejs');
const key = '38912h2378h4782';

const create = async (name, email, password) => {
    const role = 'user';
    const data = await model.create(name, email, password, role);
    return data;
};

const log = async (email, password) => {
    const data = await model.log(email, password);
    if (data) {
        return jwt.sign({ data }, key, { algorithm: 'HS256' });
    }
    return false;
};

module.exports = {
    create,
    log,
};