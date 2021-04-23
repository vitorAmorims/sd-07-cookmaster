const recipesModel = require('../models/recipesModel');
const InvalidEntries = require('../customErrors/invalidEntries');

module.exports = async (req, res, next) => {
  try {
    const { _id, role } = req.user;
    const { id } = req.params;
    const { userId } = await recipesModel.getRecipeById(id);

    if (role !== 'admin' && String(_id) !== String(userId)) {
      throw new InvalidEntries('jwt malformed', 401);
    }

    next();
  } catch (error) {
    const { message, code } = error;
    res.status(code).json({
      message,
    });
  }
};