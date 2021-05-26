const { addRecipesService } = require('../services/recipes');
const { code } = require('../helpers/messages');

const addRecipesController = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const recipe = await addRecipesService(name, ingredients, preparation);
    res.status(code[21]).json({ recipe });
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
    });
  }
};

module.exports = { addRecipesController };