const jwt = require('jsonwebtoken');
const users = require('../services/userService');
const codes = require('../services/codes');

const jwtConfing = {
    expiresIn: '1d',
    algorithm: 'HS256',
};
const createUser = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const role = req.path === '/users/admin' ? 'admin' : 'user';
        const result = await users.createUser(email, password, name, role);
        if (result.statusCode) {
            return res.status(result.statusCode).json({
                message: result.message,
            });
        }
        return res.status(codes.update).json({
            user: result,
        });
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await users.loginUser(email, password);
        if (user.statusCode) {
            return res.status(user.statusCode).json({
                message: user.message,
            });
        }
        const token = jwt.sign({ data: { username: user.email } }, codes.secret, jwtConfing);

        return res.status(codes.sucess).json({
            token,
        });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    createUser,
    loginUser,
};