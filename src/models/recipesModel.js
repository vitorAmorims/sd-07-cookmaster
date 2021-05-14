const connection = require('../../configs');

const creatRecipe = async (recipe) => {
  const createdRecipe = await (await (await connection()
    .then((db) => db.collection('recipes')))
      .insertOne(recipe));
  return createdRecipe.ops[0];
};

module.exports = {
  creatRecipe,
};
