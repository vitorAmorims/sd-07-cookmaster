const {
    addUsersService,
  } = require('../service/usersService');

const addUsersController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await addUsersService(name, email, password);
        console.log(result);
        return res.status(201).json({ user: result });
    } catch (error) {
        const err = JSON.parse(error.message);
        res.status(err.code).json({
            message: err.text,
        });
    }
};

module.exports = {
    addUsersController,
};