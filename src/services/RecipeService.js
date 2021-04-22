const { ObjectID } = require('mongodb');
const RecipeModel = require('../models/RecipeModel');

module.exports = {
  create: async (name, ingredients, preparation, userId) => {
    const [recipe] = await RecipeModel.create(name, ingredients, preparation, userId);
    return recipe;
  },
  index: async () => RecipeModel.index(),
  get: async (id) => {
    try {
      const objectId = ObjectID(id);
      return RecipeModel.getById(objectId);
    } catch {
      return null;
    }
  },
  update: async (id, body) => {
    try {
      const objectId = ObjectID(id);
      await RecipeModel.update(objectId, body);
      return RecipeModel.getById(objectId);
    } catch {
      return null;
    }
  },
  delete: async (id) => {
    try {
      const objectId = ObjectID(id);
      await RecipeModel.delete(objectId);
    } catch {
      return null;
    }
  },
};
