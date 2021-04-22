const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation) => {
  const product = await connection().then((db) =>
      db.collection('recipes').insertOne({ name, ingredients, preparation }));
  return product.ops[0];
};

module.exports = {
  createRecipe,
};