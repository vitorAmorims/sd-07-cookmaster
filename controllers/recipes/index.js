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
        res.send(data);
    } catch (error) {
        res.status(500).send(ERR_MESSAGE);
    }
};

const getRecipe = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await service.getById(id);
        if (!recipe) {
            res.status(404).json({
                message: 'recipe not found',
            });
        }
        res.send(recipe);
    } catch (error) {
        res.status(500).send(ERR_MESSAGE);
    }
};

module.exports = {
    createRecipe,
    getRecipes,
    getRecipe,
};