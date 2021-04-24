const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const duplicatedId = async (id) => {
  if (!ObjectId.isValid(id)) return null; 
  
  return connection().then((db) => 
    db.collection('recipes').findOne({ _id: ObjectId(id) }));
};

const validateRecipeExistsMiddleware = async (req, res, next) => {
  const HTTP404 = 404;
  const { id } = req.params;
  const recipeExists = await duplicatedId(id);  
  if (recipeExists === null) {
    return res.status(HTTP404).json({       
        message: 'recipe not found',             
    });
  }  
  next();
};

module.exports = validateRecipeExistsMiddleware;