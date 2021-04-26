const getConnection = require('../connection');

const getRecipes = async () => {
  try {
    const conn = await getConnection();
    const recipes = await conn.collection('recipes')
      .find({ }).toArray();
    return recipes;
  } catch (err) {
    return { status: 'recipes search fail', err };
  }
};

module.exports = getRecipes;