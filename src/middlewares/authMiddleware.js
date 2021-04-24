const authService = require('../services/authService');

const constants = require('../const');

const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(constants.UNAUTHORIZED).send({ message: constants.missingAuthToken });
    }
    if (!authService.tokenIsValid(authorization)) {
        return res.status(constants.UNAUTHORIZED).send({ message: constants.JWTMalformed });
    }
    return next();
};

module.exports = authMiddleware;