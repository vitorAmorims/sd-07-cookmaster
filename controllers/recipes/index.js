const service = require('../../services/recipes');

const ERR_MESSAGE = 'We found an error';

const createRecipe = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    try {
        const data = await service.create(name, ingredients, preparation);
        res.status(201).json({
            recipe: data,
        });
    } catch (error) {
        res.status(500).send(ERR_MESSAGE);
    }
};

const getRecipes = async (req, res) => {
    try {
        const data = await service.getAll();
        return res.send(data);
    } catch (error) {
        return res.status(500).send(ERR_MESSAGE);
    }
};

const getRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await service.getById(id);
        if (!recipe) {
            return res.status(404).json({
                message: 'recipe not found',
            });
        }
        return res.send(recipe);
    } catch (error) {
        return res.status(500).send(ERR_MESSAGE);
    }
};

const editRecipe = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    try {
        const recipe = await service.edit(id, name, ingredients, preparation);
        return res.send(recipe);
    } catch (error) {
        return res.status(500).send(ERR_MESSAGE);
    }
};

const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    try {
        const success = await service.exclude(id, name, ingredients, preparation);
        if (success) return res.status(204).send();
    } catch (error) {
        return res.status(500).send(ERR_MESSAGE);
    }
};

module.exports = {
    createRecipe,
    getRecipes,
    getRecipe,
    editRecipe,
    deleteRecipe,
};