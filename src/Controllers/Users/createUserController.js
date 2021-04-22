const { createUserService } = require('../../Services/userService');

const CREATE_SUCESS = 201;

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    createUserService(name, email, password)
    .then((result) => res.status(CREATE_SUCESS).json(result))
    .catch((err) => console.log(`Error in create user controller: ${err}`));
};

module.exports = {
    createUser,
};