const jwt = require('jsonwebtoken');

const secret = 'anything';
const ERR_MESSAGE = 'jwt malformed';

const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
};

const createToken = ({ _id, name, email, role }) => {
    const token = jwt.sign({ _id, name, email, role }, secret, jwtConfig);
    return token;
};

const decodifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        error.message = ERR_MESSAGE;
        throw error;
    }
};

module.exports = {
    createToken,
    decodifyToken,
};
