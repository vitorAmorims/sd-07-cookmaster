const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');

module.exports = async (req, res, next) => {
    try {
        const secret = 'abc';
        const auth = req.headers.authorization;
        if (!auth) {
            const err = new Error('missing auth token');
            err.statusCode = 401;
            return next(err);
        }
        const decoded = jwt.verify(auth, secret);
        const user = await userModel.findUser(decoded.data);
        if (user) req.user = user;
        next();
    } catch (error) {
        const err = new Error(error.message);
        err.statusCode = 401;
        return next(err);
    }
};
