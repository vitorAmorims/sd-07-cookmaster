/** @format */
const jwt = require('jsonwebtoken');
const { getEmail } = require('../models');

const secret = 'senhaMuitoDificiltrybe';

const getLogin = async (email, password) => {
    const valid = await getEmail(email);
    if (valid.password !== password) throw Error();

    const jwtConfig = { expiresIn: 5 * 60 * 60, algorithm: 'HS256' };
    const token = jwt.sign({ data: valid.email }, secret, jwtConfig);

    return token;
};

module.exports = { getLogin };
