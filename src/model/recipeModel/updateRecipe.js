const { ObjectId } = require('mongodb');
const getConnection = require('../connection');

const updateRecipe = async (body, userId, id) => {
  try {
    const { name, ingredients, preparation } = body;
    const conn = await getConnection();
    const recipeUpdated = await conn.collection('recipes')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } });
    return recipeUpdated;
  } catch (err) {
    console.log(err);
    return { status: 'recipe update fail', err };
  }
};

module.exports = updateRecipe;