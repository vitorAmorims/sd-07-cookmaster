const jwt = require('jsonwebtoken');
const users = require('../models/usersModel');
const codes = require('../services/codes');

const authentication = async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization;
    try {
        const decoded = jwt.verify(token, codes.secret);
        const result = await users.findUser(decoded.data.username);
        if (!result) {
            res.status(codes.unauthorized).json({
                message: 'Not auntendicated',
            });
        }
        const user = { user: decoded.data.username, role: result.role };
        req.user = user;
        next();
    } catch (error) {
        return res.status(codes.unauthorized).json({
            message: error.message,
        });
    }
};

module.exports = authentication;