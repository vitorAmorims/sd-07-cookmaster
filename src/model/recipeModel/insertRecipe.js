const getConnection = require('../connection');

const insertRecipe = async ({ name, ingredients, preparation }, id) => {
  try {
    const conn = await getConnection();
    const insertionRes = await conn.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId: id });
    return insertionRes.ops;
  } catch (err) {
    return [{ status: 'insertion fail', err }];
  }
};

module.exports = insertRecipe;