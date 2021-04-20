const { ObjectID } = require('mongodb');
const RecipeModel = require('../models/RecipeModel');

async function create(name, ingredients, preparation, userId) {
  const [recipe] = await RecipeModel.create(name, ingredients, preparation, userId);
  return recipe;
}

async function index() {
  return RecipeModel.index();
}

async function get(id) {
  try {
    const objectId = ObjectID(id);
    return RecipeModel.getById(objectId);
  } catch {
    return null;
  }
}

async function update(id, body) {
  try {
    const objectId = ObjectID(id);
    await RecipeModel.update(objectId, body);
    return RecipeModel.getById(objectId);
  } catch {
    return null;
  }
}

module.exports = {
  index,
  create,
  get,
  update,
};
