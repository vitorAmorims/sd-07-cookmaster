const { deleteRecipeService } = require('../../Services/recipeService');

const SUCESS = 204;

const deleteRecipeController = async (req, res) => {
    const { id } = req.params;

    deleteRecipeService(id)
    .then((result) => res.status(SUCESS).json(result))
    .catch((err) => console.log(err));
};

module.exports = {
    deleteRecipeController,
};