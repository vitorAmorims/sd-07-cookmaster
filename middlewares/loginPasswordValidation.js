const jwt = require('jsonwebtoken');

const UserModel = require('../models/usersModel');

const status = require('../utils/status');

const secret = 'abc';

module.exports = async (req, res, next) => {
    const { email } = req.body;
    const user = await UserModel.findUser(email);
    if (!user) {
        const err = new Error('Incorrect username or password');
        err.statusCode = 401;
        return next(err);
    }
    const token = jwt.sign({ data: user.email }, secret, { expiresIn: '1h' });
    next();
    return res.status(status.ok).json({ token });
};
