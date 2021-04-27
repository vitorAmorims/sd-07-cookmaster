const { ObjectId } = require('mongodb');
const { connect } = require('./model');

module.exports = {
  async create(recipe) {
    const recipeCreated = await connect('recipes', 'insertOne', recipe);
    return recipeCreated.ops[0];
  },
  async getAll() {
    const recipes = await connect('recipes', 'find', {});
    return recipes.toArray();
  },
  async getById(id) {
    const recipe = await connect('recipes', 'findOne', { _id: ObjectId(id) });
    return recipe;
  },
};
