const {
    addUsersService,
    userLoginService,
    validateEmailAndPassword,
    addRecipeService,
} = require('../service/usersService');

const addUsersController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await addUsersService(name, email, password);
        return res.status(201).json({ user: result });
    } catch (error) {
        const err = JSON.parse(error.message);
        return res.status(err.code).json({
            message: err.text,
        });
    }
};

const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        await validateEmailAndPassword(email, password);
        const result = await userLoginService(email, password);
        return res.status(200).json(result);
    } catch (error) {
        const err = JSON.parse(error.message);
        return res.status(err.code).json({
            message: err.text,
        });
    }
};

const addRecipesController = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;
    try {
        const result = await addRecipeService(name, ingredients, preparation, token);
        if (result) return res.status(201).json(result);
    } catch (error) {
        const err = JSON.parse(error.message);
        return res.status(err.code).json({
            message: err.text,
        });
    }
};

module.exports = {
    addUsersController,
    userLoginController,
    addRecipesController,
};