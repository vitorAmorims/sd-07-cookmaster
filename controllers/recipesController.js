const recipesModel = require('../models/recipesModel');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { user } = req;
    // console.log(req.user);
    const { _id: userId } = user;
    // console.log(userId);
    const newRecipe = await recipesModel.create(name, ingredients, preparation, userId);
    return res.status(201).json(newRecipe);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createRecipe,
};
