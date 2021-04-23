const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const validateUser = async (req, res, next) => {
  const { id } = req.params;

  const admins = await userModel.getIdAdmin();

  const isAdmin = admins.some(({ _id }) => _id.toString() === req.userId);

  const recipeForEdit = await recipeModel.getRecipeById(id);

  if (req.userId !== recipeForEdit.userId && !isAdmin) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }
  next();
};

module.exports = validateUser;
