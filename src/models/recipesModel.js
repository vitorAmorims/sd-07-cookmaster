const connection = require('../config/conn');

const createRecipes = async (name, ingredients, preparation, _id) => {
  const recipe = await connection().then((db) =>
    db.collection('recipes').insertOne({ 
      recipe: { name, ingredients, preparation, userId: _id }, 
    }));
  return recipe.ops[0];
};

module.exports = {
  createRecipes,
};
// O campo ID do autor, deve ser preenchido automaticamente com o ID do usuário logado, que deve ser extraído do token JWT.