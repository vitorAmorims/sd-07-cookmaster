const conn = require('../config/conn');

const collection = 'recipes';
const addRecipe = async (name, ingredients, preparation, userId) => {
  const users = await conn().then((db) =>
    db.collection(collection).insertOne({ name, ingredients, preparation, userId }));

  return { recipe: { name, ingredients, preparation, userId, _id: users.insertedId } };
};

module.exports = {
  addRecipe,
};
