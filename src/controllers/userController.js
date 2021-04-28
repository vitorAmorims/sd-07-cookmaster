const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { createUserValidation, loginUserValidation } = require('../services/userService');

const secret = 'minhaSenhaUltraSecreta';

const addNewUser = async (req, res) => {
    const { name: newName, email: newEmail, password } = req.body;
    const validationResult = await createUserValidation(newName, newEmail, password);
    if (validationResult.message) {
        return res.status(validationResult.status).json({ message: validationResult.message });
    }
    try {
        const newUser = await userModel.addUser(newName, newEmail, password);
        const { _id, name, email, role } = newUser;
        const responseObject = {
            user: { name, email, role, _id },
        };
        res.status(201).json(responseObject);
    } catch (error) {
        throw new Error(error);
    }
};

const login = async (req, res) => {
    const { email: reqEmail, password } = req.body;
    const validation = await loginUserValidation(reqEmail, password);
    if (validation.message) {
        return res.status(validation.status).json({ message: validation.message });
    }
    try {
        const user = await userModel.findUserByEmail(reqEmail);
        const jwtConfig = {
            expiresIn: '5d',
            algorithm: 'HS256',
        };
        const { _id, email, role } = user;
        const token = jwt.sign({ data: { _id, email, role } }, secret, jwtConfig);
        res.status(200).json({ token });
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    addNewUser,
    login,
    secret,
};
