const Recipe = require('../model/RecipeModel');

// const SUCCESS = 200;
const CREATED = 201;

const createRecipeController = async (req, res, next) => {
    try {
        const { name, ingredients, preparation } = req.body;
        const { _id: userId } = req.user;
        const newRecipe = await Recipe.createRecipe(name, ingredients, preparation, userId);
        if (!newRecipe) throw Error;

        res.status(CREATED).json({ recipe: newRecipe });
    } catch (err) {
        next(err);
        }
};

module.exports = {
    createRecipeController,
};
