const UsersService = require('../services/UsersService');

const SUCESS = 200;

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const token = await UsersService.findByUserEmail(email, password);
        return res.status(SUCESS).json({ token });
    } catch (err) {
        next(err);
    }
};

module.exports = { login };