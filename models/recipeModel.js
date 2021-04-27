const connect = require('../config/conn');

const registerRecipe = async (name, ingredients, preparation, userId) => {
    const newRecipe = await connect().then((db) => db.collection('recipes')
      .insertOne({ name, ingredients, preparation, userId }));
      return { _id: newRecipe.insertedId, name, ingredients, preparation, userId };
};
const findAll = async () => {
    const recipes = await connect().then((db) => db.collection('recipes')
      .find().toArray());
    return recipes;
  };

module.exports = {
    registerRecipe,
    findAll,
};