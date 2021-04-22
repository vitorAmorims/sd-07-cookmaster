const {
    addUsersService,
    userLoginService,
    validateEmailAndPassword,
    addRecipeService,
    getAllRecipesService,
    getRecipeByIdService,
    updateRecipeByIdService,
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

const getAllRecipesController = async (req, res) => {
    try {
        const recipeList = await getAllRecipesService();
        return res.status(200).json(recipeList);
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};
const getRecipeByIdController = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization;
    try {
        const recipe = await getRecipeByIdService(id, token);
        res.status(200).json(recipe);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

const updateRecipeByIdController = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json('missing auth token');
    }
    try {
        const result = await updateRecipeByIdService(id, body, token);
        if (result) return res.status(200).json(result);
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};

module.exports = {
    addUsersController,
    userLoginController,
    addRecipesController,
    getAllRecipesController,
    getRecipeByIdController,
    updateRecipeByIdController,
};