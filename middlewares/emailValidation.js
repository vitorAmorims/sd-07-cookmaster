const UserModel = require('../models/usersModel');

async function isThereEmail(email) {
    const users = await UserModel.getAllUsers();
    const isThere = users.some((user) => user.email === email);
    return isThere;
}

module.exports = async (req, res, next) => {
    const { email } = req.body;
    if (await isThereEmail(email)) {
        const err = new Error('Email already registered');
        err.statusCode = 409;
        return next(err);
    }
    return next();
};
