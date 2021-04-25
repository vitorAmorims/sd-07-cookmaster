const jwt = require('jsonwebtoken');

const secret = 'dontstopdancing';

const jwtFunc = async (user) => {
    const jwtConfig = {
        expiresIn: '1d',
        algorithm: 'HS256',
    };

    const payload = { 
        data: user,
     };

     const token = jwt.sign({ payload }, secret, jwtConfig);
     return token;
};

module.exports = jwtFunc;