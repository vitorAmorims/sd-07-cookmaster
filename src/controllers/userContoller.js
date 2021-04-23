const userService = require('../services/userService');
const constants = require('../const');

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const createUserResult = await userService.createUser(name, email, password);

        if (createUserResult.error) {            
            return res.status(createUserResult.error.status).json({
                message: createUserResult.error.message,
            });           
        }

        return res.status(constants.CREATED).json({ user: createUserResult });
    } catch (err) {
        console.error(err);
    }
};

module.exports = {
    createUser,
};