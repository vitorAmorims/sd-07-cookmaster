const { ObjectId } = require('mongodb');
const getConnection = require('../connection');

const getRecipeById = async (id) => {
  try {
    const conn = await getConnection();
    const recipeById = conn.collection('recipes')
      .findOne({ _id: ObjectId(id) });
    return recipeById;
  } catch (err) {
    console.log(err);
    return { status: 'recipe search fail' };
  }
};

module.exports = getRecipeById;