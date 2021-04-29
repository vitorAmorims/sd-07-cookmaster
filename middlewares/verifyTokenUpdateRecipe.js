const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const recipe = require('../models/recipeModel');

const secret = 'abc';

const getUserByIdRecipe = async (id) => {
  if (!ObjectId.isValid(id)) return null;  
  const oneRecipe = await recipe.getById(id);
  return oneRecipe;
};

const verifyTokenUpdateRecipeMiddleware = async (req, res, next) => {
  const idRecipe = req.params.id;
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const decoded = jwt.verify(token, secret);
    req.tokenUserId = decoded.id;
    req.tokenUserRole = decoded.role;
  } catch (error) {
    return res.status(401).json({ message: 'jwt malformed' });
  }

  const userRecipe = await getUserByIdRecipe(idRecipe);
  
  req.recipeUserId = userRecipe.userId;

  next();
};

module.exports = verifyTokenUpdateRecipeMiddleware;