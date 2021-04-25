const recipeService = require('../services/recipeService');

const HTTP200 = 200;
const HTTP201 = 201;
const HTTP404 = 404;
const HTTP500 = 500;

const createRecipe = async (req, res) => {
  try {
    const { userId } = req;
    const { name, ingredients, preparation } = req.body;    
    const result = await recipeService.createRecipe(name, ingredients, preparation, userId);        
    res.status(HTTP201).json(result);
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};

const allRecipes = async (req, res) => {
  try {
    const result = await recipeService.getAllRecipe();        
    res.status(HTTP200).json(result);    
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};

const oneRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipeService.getOneRecipe(id);        
    res.status(HTTP200).json(result);    
  } catch (err) {
    console.log(err);
    res.status(HTTP500).json({ message: err.message });
  }
};

const updateOneRecipe = async (req, res) => {
  try {
    const { tokenUserId, tokenUserRole, recipeUserId } = req;
    const { name, ingredients, preparation } = req.body;
    const { id } = req.params;
    if (tokenUserId !== recipeUserId && tokenUserRole !== 'admin') {
      res.status(HTTP404).json({ message: 'Não tem autorização para alterar' });
    } 
    const result = await recipeService.updateRecipe(id, name, ingredients, preparation);
    if (!result) {
      res.status(HTTP404).json({ message: 'Produto não encontrado :(' });
      return;
    }
    res.status(HTTP200).json({ _id: id, name, ingredients, preparation, recipeUserId });
  } catch (err) {
    res.status(HTTP500).json({ message: err.message });
  }
};

module.exports = {
  createRecipe,
  allRecipes,
  oneRecipe,
  updateOneRecipe,
};