const connection = require('./conn');

const addRecipesModel = async (name, ingredients, preparation) => {
  const recipe = { name, ingredients, preparation };
  const db = await connection();
  const product = await db.collection('recipes').insertOne(recipe);
  return product.ops[0];
};

module.exports = {
  addRecipesModel,
};