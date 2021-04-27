const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const CustomError = require('./CustomError');

const secret = 'abc';

const validateToken = async (req, _res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new CustomError(StatusCodes.UNAUTHORIZED, 'missing auth token');
        }
        const decoded = jwt.verify(token, secret);
        if (!decoded) throw new CustomError(StatusCodes.UNAUTHORIZED, 'jwt malformed');
        const { _id, role } = decoded;
        req.userId = _id;
        req.userRole = role;
        next();
    } catch (error) {
        next({
            status: StatusCodes.UNAUTHORIZED,
            message: error.message,
          });
    }
};

module.exports = validateToken;