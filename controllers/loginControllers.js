const { validationResult } = require('express-validator');
const jwtCreate = require('../helpers/jwtCreate');
const loginService = require('../service/loginService');
const message = require('../helpers/message.json');

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ message: message.loginEmailrequired });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ message: message.invalidEmail });
    }
    const result = await loginService.login(email, password);

    if (result.code) {
        return res.status(result.code).json(
            { message: result.message },
        );
    }
    const token = jwtCreate(result);
    res.status(200).json({ user: { email, password }, token });
};

module.exports = login;