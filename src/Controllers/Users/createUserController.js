const { createUserService } = require('../../Services/userService');

const CREATE_SUCESS = 201;

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    createUserService(name, email, password, role)
    .then((result) => res.status(CREATE_SUCESS).json(result))
    .catch((err) => console.log(`Error in create user controller: ${err}`));
};

module.exports = {
    createUser,
};