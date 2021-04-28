const { updateRecipeService } = require('../../Services/recipeService');

const CODE_SUCESS = 200;

const updateRecipeController = async (req, res) => {
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
   
    updateRecipeService(name, ingredients, preparation, id)
    .then((result) => res.status(CODE_SUCESS).json(result))
    .catch((err) => console.log(err));
};

module.exports = {
    updateRecipeController,
};