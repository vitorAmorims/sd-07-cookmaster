const ValidateService = require('../services/ValidateService');
const UsersService = require('../services/UsersService');
// const error = require('../services/Error_data');

const 

validateToken = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);    
    try {
        ValidateService.validToken(token);
        const decoded = ValidateService.verifyToken(token, 'secreteCrypt');
        const userData = await UsersService.findByUserEmailLogin(decoded.email);
        console.log(userData);
        req.user = userData;         
        next();
    } catch (err) {
        console.log(err);
        next(err);
    }
};

module.exports = validateToken;