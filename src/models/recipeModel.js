const { ObjectId } = require('mongodb');
const { connect } = require('./model');

module.exports = {
  create: async (recipe) => {
    const recipeCreated = await connect('recipes', 'insertOne', recipe);
    return recipeCreated.ops[0];
  },
  getAll: async () => {
    const recipes = await connect('recipes', 'find', {});
    return recipes.toArray();
  },
  getById: async (id) => {
    const recipe = await connect('recipes', 'findOne', { _id: ObjectId(id) });
    return recipe;
  },
};
