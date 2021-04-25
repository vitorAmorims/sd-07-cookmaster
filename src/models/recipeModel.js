const { connect } = require('./model');

module.exports = {
  create: async (recipe) => {
    const recipeCreated = await connect('recipes', 'insertOne', recipe);
    return recipeCreated.ops[0];
  },
};