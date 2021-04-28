const { getRecipeByIdService } = require('../../Services/recipeService');

const SUCESS = 200;

const getRecipeByIdController = async (req, res) => {
    const { id } = req.params;
    getRecipeByIdService(id)
    .then((result) => res.status(SUCESS).json(result))
    .catch((err) => console.log(err));
};

module.exports = {
    getRecipeByIdController,
};