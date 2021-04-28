const { getAllReicipesService } = require('../../Services/recipeService');

const SUCESS = 200;

const getAllRecipesController = async (_req, res) => {
  getAllReicipesService()
    .then((result) => res.status(SUCESS).json(result))
    .catch((err) => console.log(err));
};

module.exports = {
  getAllRecipesController,
};
