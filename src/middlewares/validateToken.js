const ValidateService = require('../services/ValidateService');
const UsersService = require('../services/UsersService');

const validateToken = async (req, res, next) => {
    const token = req.headers.authorization;   
    try {
        ValidateService.validToken(token);
        const decoded = ValidateService.verifyToken(token, 'secreteCrypt');
        const userData = await UsersService.findByUserEmailLogin(decoded.email);
        req.user = userData;         
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = validateToken;