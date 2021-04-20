const rescue = require('express-rescue');
const userModel = require('../models/userModel');

const addNewUser = rescue(async (req, res) => {
    const { name: newName, email: newEmail, password } = req.body;
    try {
        const newUser = await userModel.addUser(newName, newEmail, password);
        const { _id, name, email, role } = newUser;
        const responseObject = {
            user: {
                name,
                email,
                role,
                _id,
            },
        };
        res.status(201).json(responseObject);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
    addNewUser,
};
