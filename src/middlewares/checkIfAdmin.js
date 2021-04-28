const recipesModel = require('../models/recipesModel');

const checkIfAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await recipesModel.getById(id);
    const { name, _id } = req.user;
    if (name !== 'admin' && _id !== recipe.userId && recipe.userId !== undefined) {
      return res.status(402).json({ message: 'missing auth token' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = checkIfAdmin;
